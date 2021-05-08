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

import {ImageLogotipoBlack} from '../../../assets/images';
import {
  HeaderBack,
  InputText,
  InputMask,
  ButtonDefault,
} from '../../../components';
import {configErros, configValues} from '../../../config';
import {useAuth} from '../../../hooks/auth';
import {IErrorsMiddleware} from '../../../interfaces';
import {IUser} from '../../../models';
import {apiPortalDosPets} from '../../../services';
import {notifyFlashMessage} from '../../../utils/notifications';
import {validatorYup} from '../../../utils/validators';

import {schema} from './schemaValidation';

import {
  Container,
  LogotipoImage,
  Information,
  InformationTitle,
  InformationSubtitle,
  FormContainer,
  FormSignUp,
  FielGroup,
  TermsOfUseView,
  TermsOfUseText,
  TermsOfUseLink,
} from './styles';

interface ISignUpFormData {
  name: string;
  cpf: string;
  dateOfBirth: string;
  email: string;
  cellphone: string;
  password: string;
  confirmedPassword: string;
}

const SignUpCustomer: React.FC = () => {
  const {goBack} = useNavigation();
  const {navigate} = useNavigation();
  const {updateUserLocalStorage, signIn} = useAuth();
  const formSignUpRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);
  const cpfInputRef = useRef<TextInput>(null);
  const dateOfBirthInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const cellphoneInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmedPasswordInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitSignUp = useCallback(async (data: ISignUpFormData) => {
    try {
      setLoading(prevState => !prevState);
      formSignUpRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const {data: responseUser} = await apiPortalDosPets.post(`/users`, {
        name: data.name,
        cpfCnpj: data.cpf,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        cellphone: data.cellphone,
        password: data.password,
        personType: configValues.user.personType.physics,
        status: configValues.user.status.active,
        role: configValues.user.role.customer,
        acceptTermsOfUse: true,
      });

      notifyFlashMessage({
        title: 'Cadastro realizado!',
        message: 'Estamos te levando para a tela inicial.',
        type: 'success',
      });

      const userCreated: IUser = responseUser.data;

      updateUserLocalStorage(userCreated);

      formSignUpRef.current?.reset();

      setLoading(prevState => !prevState);

      await signIn({email: data.email, password: data.password});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = validatorYup.getValidationErrors(error);

        formSignUpRef.current?.setErrors(errors);

        const {
          name,
          cpf,
          dateOfBirth,
          email,
          cellphone,
          password,
          confirmedPassword,
        } = errors;

        if (name)
          notifyFlashMessage({
            title: 'Algo não está certo!',
            message: name,
            type: 'danger',
          });
        else if (cpf)
          notifyFlashMessage({
            title: 'Algo não está certo!',
            message: cpf,
            type: 'danger',
          });
        else if (dateOfBirth)
          notifyFlashMessage({
            title: 'Algo não está certo!',
            message: dateOfBirth,
            type: 'danger',
          });
        else if (email)
          notifyFlashMessage({
            title: 'Algo não está certo!',
            message: email,
            type: 'danger',
          });
        else if (cellphone)
          notifyFlashMessage({
            title: 'Algo não está certo!',
            message: cellphone,
            type: 'danger',
          });
        else if (password)
          notifyFlashMessage({
            title: 'Algo não está certo!',
            message: password,
            type: 'danger',
          });
        else if (confirmedPassword)
          notifyFlashMessage({
            title: 'Algo não está certo!',
            message: confirmedPassword,
            type: 'danger',
          });
      } else if (error.response.data) {
        // Tratando erros de middlewares
        if (error.response.data.object) {
          const responseError: IErrorsMiddleware = error.response.data;
          const [firstError] = responseError.errors;

          if (firstError.code === configErros.user.create.invalidName)
            nameInputRef.current?.focus();
          else if (
            firstError.code === configErros.user.create.invalidCpfOrCnpj ||
            firstError.code === configErros.user.create.invalidCpf
          )
            cpfInputRef.current?.focus();
          else if (
            firstError.code === configErros.user.create.invalidDateOfBirth
          )
            dateOfBirthInputRef.current?.focus();
          else if (firstError.code === configErros.user.create.invalidEmail)
            emailInputRef.current?.focus();
          else if (firstError.code === configErros.user.create.invalidCellphone)
            cellphoneInputRef.current?.focus();
          else if (firstError.code === configErros.user.create.invalidPassword)
            passwordInputRef.current?.focus();

          notifyFlashMessage({
            title: 'Sinto muito...',
            message:
              firstError.description ||
              'Há algo errado com os dados informados.',
            type: 'danger',
          });
        } else {
          // Tratando erros de services
          notifyFlashMessage({
            title: 'Sinto muito...',
            message: error.response.data.error,
            type: 'danger',
          });
        }
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
              <InformationTitle>Para clientes</InformationTitle>
              <InformationSubtitle>
                Por favor, envie os seguintes dados para realizar seu cadastro.
              </InformationSubtitle>
            </Information>
            <FormContainer>
              <FormSignUp ref={formSignUpRef} onSubmit={handleSubmitSignUp}>
                <FielGroup>
                  <InputText
                    ref={nameInputRef}
                    name="name"
                    icon="user"
                    placeholder="Nome completo"
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={true}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      cpfInputRef.current?.focus();
                    }}
                    // autoFocus={true}
                  />
                </FielGroup>

                <FielGroup>
                  <InputMask
                    ref={cpfInputRef}
                    name="cpf"
                    icon="user"
                    placeholder="Seu CPF"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      dateOfBirthInputRef.current?.focus();
                    }}
                    mask={'[000].[000].[000]-[00]'}
                    // autoFocus={true}
                  />
                </FielGroup>

                <FielGroup>
                  <InputMask
                    ref={dateOfBirthInputRef}
                    name="dateOfBirth"
                    icon="user"
                    placeholder="Data de nascimento"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      emailInputRef.current?.focus();
                    }}
                    mask={'[00]/[00]/[0000]'}
                    // autoFocus={true}
                  />
                </FielGroup>

                <FielGroup>
                  <InputText
                    ref={emailInputRef}
                    name="email"
                    icon="mail"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      cellphoneInputRef.current?.focus();
                    }}
                    // autoFocus={true}
                  />
                </FielGroup>

                <FielGroup>
                  <InputMask
                    ref={cellphoneInputRef}
                    name="cellphone"
                    icon="phone-call"
                    placeholder="Celular"
                    keyboardType="numeric"
                    autoCapitalize="words"
                    autoCorrect={true}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      passwordInputRef.current?.focus();
                    }}
                    mask={'+[00] [00] [00000]-[0000]'}
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
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      confirmedPasswordInputRef.current?.focus()
                    }
                  />
                </FielGroup>

                <FielGroup>
                  <InputText
                    ref={confirmedPasswordInputRef}
                    name="confirmedPassword"
                    icon="lock"
                    placeholder="Confirme a senha"
                    secureTextEntry
                    returnKeyType="send"
                    onSubmitEditing={() => formSignUpRef.current?.submitForm()}
                  />
                </FielGroup>

                <TermsOfUseView>
                  <TermsOfUseText>
                    Ao continuar você concorda com os{' '}
                    <TermsOfUseLink>termos de uso</TermsOfUseLink> e{' '}
                    <TermsOfUseLink>políticas de privacidade</TermsOfUseLink>.
                  </TermsOfUseText>
                </TermsOfUseView>

                <ButtonDefault
                  loading={loading}
                  onPress={() => formSignUpRef.current?.submitForm()}>
                  Cadastrar
                </ButtonDefault>
              </FormSignUp>
            </FormContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUpCustomer;
