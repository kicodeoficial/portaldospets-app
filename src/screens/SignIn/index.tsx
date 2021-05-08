import React, {useCallback, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import {ImageLogotipoBlack} from '../../assets/images';
import {useAuth} from '../../hooks/auth';
import {InputText, HeaderBack, ButtonDefault} from '../../components';
import {notifyFlashMessage} from '../../utils/notifications';
import {validatorYup} from '../../utils/validators';

import {schema} from './schemaValidation';

import {
  Container,
  LogotipoImage,
  Information,
  InformationTitle,
  InformationSubtitle,
  FormContainer,
  FormSignIn,
  FielGroup,
  ForgetPassword,
  ForgetPasswordTouch,
  ForgetPasswordText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {goBack} = useNavigation();
  const {navigate} = useNavigation();
  const {updateUserLocalStorage, signIn} = useAuth();
  const formSignInRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitSignIn = useCallback(async (data: SignInFormData) => {
    try {
      setLoading(prevState => !prevState);
      formSignInRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({email: data.email, password: data.password});

      formSignInRef.current?.reset();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = validatorYup.getValidationErrors(error);

        formSignInRef.current?.setErrors(errors);

        const {email, password} = errors;

        if (email)
          notifyFlashMessage({
            title: 'Algo não parece certo!',
            message: email,
            type: 'danger',
          });
        else if (password)
          notifyFlashMessage({
            title: 'Algo não parece certo!',
            message: password,
            type: 'danger',
          });
      } else if (error.response.data) {
        notifyFlashMessage({
          title: 'Sinto muito...',
          message: error.response.data.error,
          type: 'danger',
        });
      }
    } finally {
      setLoading(prevState => !prevState);
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <Container>
            <HeaderBack icon="arrowLeft" onPressFunction={goBack} />
            <LogotipoImage source={ImageLogotipoBlack} />
            <Information>
              <InformationTitle>Acessar conta</InformationTitle>
              <InformationSubtitle>
                Entre com o e-mail e senha cadastrada
              </InformationSubtitle>
            </Information>
            <FormContainer>
              <FormSignIn ref={formSignInRef} onSubmit={handleSubmitSignIn}>
                <FielGroup>
                  <InputText
                    name="email"
                    icon="mail"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      passwordInputRef.current?.focus();
                    }}
                    // autoFocus={true}
                  />
                </FielGroup>
                <FielGroup>
                  <InputText
                    ref={passwordInputRef}
                    name="password"
                    icon="lock"
                    placeholder="Senha"
                    secureTextEntry
                    returnKeyType="send"
                    onSubmitEditing={() => formSignInRef.current?.submitForm()}
                  />
                </FielGroup>
                <ForgetPassword>
                  <ForgetPasswordTouch
                    onPress={() => navigate('ResetPassword')}>
                    <ForgetPasswordText>Esqueci minha senha</ForgetPasswordText>
                  </ForgetPasswordTouch>
                </ForgetPassword>
                <ButtonDefault
                  loading={loading}
                  onPress={() => formSignInRef.current?.submitForm()}>
                  Entrar
                </ButtonDefault>
              </FormSignIn>
            </FormContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
