import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FormHandles} from '@unform/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

import {ImageLogotipoBlack} from '../../assets/images';
import {InputText, HeaderBack, ButtonDefault} from '../../components';
import {configRules} from '../../config';
import {RecoverPassword} from '../../models';
import {apiPortalDosPets} from '../../services';
import {notifyFlashMessage} from '../../utils/notifications';
import {validatorYup} from '../../utils/validators';

import {
  schemaSendEmail,
  schemaValidationCode,
  schemaUpdatePassword,
} from './schemaValidation';

import {
  Container,
  LogotipoImage,
  Information,
  InformationTitle,
  InformationSubtitle,
  FormContainer,
  FormSignin,
  FielGroup,
  ResendCode,
  ResendCodeTouch,
  ResendCodeText,
  ResendCodeTimer,
} from './styles';

interface ISendEmailFormData {
  email: string;
}

interface IValidationCodeFormData {
  code: string;
}

interface IUpdatePasswordFormData {
  password: string;
  confirmedPassword: string;
}

interface ICountClock {
  duration: number;
  liveTimeMin: number;
  liveTimeSec: number;
  color: string;
  colorInt: number;
  timeFormat: string;
  flagTimer: boolean;
}

const RECOVER_DATA_LOCALSTORAGE = '@PortalDosPets:RecoverPassword';
const USER_EMAIL_DATA_LOCALSTORAGE = '@PortalDosPets:User:email';

const ResetPassword: React.FC = () => {
  const {goBack} = useNavigation();
  const formSendEmailRef = useRef<FormHandles>(null);
  const formValidationCodeRef = useRef<FormHandles>(null);
  const formUpdatePasswordRef = useRef<FormHandles>(null);
  const confirmedPasswordInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [codeSentHowManyTimes, setCodeSentHowManyTimes] = useState<number>(0);
  const [timer, setTimer] = useState<number>(
    configRules.recoverPassword.waitingTimeToResendCodeInSeconds,
  );
  const [clockFinished, setClockFinished] = useState<boolean>(true);

  const handleSubmitSendEmail = useCallback(
    async (data: ISendEmailFormData) => {
      try {
        setLoading(prevState => !prevState);
        formSendEmailRef.current?.setErrors({});

        if (
          codeSentHowManyTimes <=
          configRules.recoverPassword.codeSentHowManyTimes
        ) {
          await schemaSendEmail.validate(data, {
            abortEarly: false,
          });

          const {data: responseRecoverPassword} = await apiPortalDosPets.post(
            `/users/recover-password`,
            {
              email: data.email,
            },
          );

          await AsyncStorage.setItem(USER_EMAIL_DATA_LOCALSTORAGE, data.email);
          await AsyncStorage.setItem(
            RECOVER_DATA_LOCALSTORAGE,
            JSON.stringify(responseRecoverPassword.data),
          );

          setStep(2);
          setCodeSentHowManyTimes(codeSentHowManyTimes + 1);

          notifyFlashMessage({
            title: 'Código enviado!',
            message: 'Verique a caixa de entrada do e-mail informado',
            type: 'success',
          });

          formSendEmailRef.current?.reset();
        } else {
          notifyFlashMessage({
            title: 'Limite de tentativas excedidas!',
            message: `Aguarde ${configRules.recoverPassword.standbyTimeInHours}h ou contate nossa central de atentimentos.`,
            type: 'danger',
          });
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = validatorYup.getValidationErrors(error);

          formSendEmailRef.current?.setErrors(errors);

          const {email} = errors;

          if (email)
            notifyFlashMessage({
              title: 'Algo não parece certo!',
              message: email,
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
    },
    [],
  );

  const handleSubmitValidationCode = useCallback(
    async (data: IValidationCodeFormData) => {
      try {
        setLoading(prevState => !prevState);

        formValidationCodeRef.current?.setErrors({});

        await schemaValidationCode.validate(data, {
          abortEarly: false,
        });

        const recoverPasswordSaved = await AsyncStorage.getItem(
          RECOVER_DATA_LOCALSTORAGE,
        );

        const recoverPassword: RecoverPassword = JSON.parse(
          recoverPasswordSaved || '{}',
        );

        await apiPortalDosPets.post(
          `/users/recover-password/${recoverPassword.id}`,
          {
            code: Number.parseInt(data.code, 10),
          },
        );

        setStep(3);

        notifyFlashMessage({
          title: 'Validado!',
          message: 'Agora, basta informa sua nova senha.',
          type: 'success',
        });

        formValidationCodeRef.current?.reset();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = validatorYup.getValidationErrors(error);

          formValidationCodeRef.current?.setErrors(errors);

          const {code} = errors;

          if (code)
            notifyFlashMessage({
              title: 'Algo não parece certo!',
              message: code,
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
    },
    [],
  );

  const handleSubmitUpdatePassword = useCallback(
    async (data: IUpdatePasswordFormData) => {
      try {
        setLoading(prevState => !prevState);

        formUpdatePasswordRef.current?.setErrors({});

        await schemaUpdatePassword.validate(data, {
          abortEarly: false,
        });

        const recoverPasswordSaved = await AsyncStorage.getItem(
          RECOVER_DATA_LOCALSTORAGE,
        );

        const recoverPassword: RecoverPassword = JSON.parse(
          recoverPasswordSaved || '{}',
        );

        await apiPortalDosPets.put(
          `/users/${recoverPassword.users_id}/password`,
          {
            password: data.password,
          },
        );

        notifyFlashMessage({
          title: 'Senha alterada!',
          message: 'Pode acessar sua conta normalmente.',
          type: 'success',
        });

        formUpdatePasswordRef.current?.reset();

        await AsyncStorage.removeItem(RECOVER_DATA_LOCALSTORAGE);
        await AsyncStorage.removeItem(USER_EMAIL_DATA_LOCALSTORAGE);

        goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = validatorYup.getValidationErrors(error);

          formUpdatePasswordRef.current?.setErrors(errors);

          const {password, confirmedPassword} = errors;

          if (password)
            notifyFlashMessage({
              title: 'Algo não parece certo!',
              message: password,
              type: 'danger',
            });

          if (confirmedPassword)
            notifyFlashMessage({
              title: 'Algo não parece certo!',
              message: confirmedPassword,
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
    },
    [],
  );

  const startClock = () => {
    setClockFinished(prevState => !prevState);
    const clockCall = setInterval(() => {
      setTimer(prevState => prevState - 1);
    }, 1000);
    setTimeout(() => {
      setTimer(configRules.recoverPassword.waitingTimeToResendCodeInSeconds);
      setClockFinished(prevState => !prevState);
      clearInterval(clockCall);
    }, configRules.recoverPassword.waitingTimeToResendCodeInSeconds * 1000);
  };

  const resendCode = useCallback(async () => {
    startClock();
    const userEmail: string =
      (await AsyncStorage.getItem(USER_EMAIL_DATA_LOCALSTORAGE)) || '';
    await handleSubmitSendEmail({email: userEmail});
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
            {step === 1 && (
              <>
                <Information>
                  <InformationTitle>Recuperar sua senha</InformationTitle>
                  <InformationSubtitle>
                    Informe o e-mail cadastrado
                  </InformationSubtitle>
                </Information>
                <FormContainer>
                  <FormSignin
                    ref={formSendEmailRef}
                    onSubmit={handleSubmitSendEmail}>
                    <FielGroup>
                      <InputText
                        name="email"
                        icon="mail"
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="send"
                        onSubmitEditing={() =>
                          formSendEmailRef.current?.submitForm()
                        }
                        // autoFocus={true}
                      />
                    </FielGroup>
                    <ButtonDefault
                      loading={loading}
                      onPress={() => formSendEmailRef.current?.submitForm()}>
                      Continuar
                    </ButtonDefault>
                  </FormSignin>
                </FormContainer>
              </>
            )}

            {step === 2 && (
              <>
                <Information>
                  <InformationTitle>Validar código</InformationTitle>
                  <InformationSubtitle>
                    Digite o código recebido no e-mail
                  </InformationSubtitle>
                </Information>
                <FormContainer>
                  <FormSignin
                    ref={formValidationCodeRef}
                    onSubmit={handleSubmitValidationCode}>
                    <FielGroup>
                      <InputText
                        name="code"
                        icon="check-circle"
                        placeholder="Código"
                        autoCapitalize="none"
                        keyboardType="numeric"
                        autoCorrect={false}
                        returnKeyType="send"
                        onSubmitEditing={() =>
                          formValidationCodeRef.current?.submitForm()
                        }
                        // autoFocus={true}
                      />
                    </FielGroup>
                    <ResendCode>
                      <ResendCodeTouch
                        onPress={() =>
                          clockFinished ? resendCode() : () => {}
                        }>
                        <ResendCodeText isDisabled={!clockFinished}>
                          Reenviar código{' '}
                        </ResendCodeText>
                        {!clockFinished && (
                          <ResendCodeTimer>{`00:${
                            timer < 10 ? `0${timer}` : timer
                          }`}</ResendCodeTimer>
                        )}
                      </ResendCodeTouch>
                    </ResendCode>
                    <ButtonDefault
                      loading={loading}
                      onPress={() =>
                        formValidationCodeRef.current?.submitForm()
                      }>
                      Continuar
                    </ButtonDefault>
                  </FormSignin>
                </FormContainer>
              </>
            )}

            {step === 3 && (
              <>
                <Information>
                  <InformationTitle>Definir nova senha</InformationTitle>
                  <InformationSubtitle>
                    Escolha uma senha simples e segura
                  </InformationSubtitle>
                </Information>
                <FormContainer>
                  <FormSignin
                    ref={formUpdatePasswordRef}
                    onSubmit={handleSubmitUpdatePassword}>
                    <FielGroup>
                      <InputText
                        name="password"
                        icon="lock"
                        placeholder="Nova senha"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          confirmedPasswordInputRef.current?.focus();
                        }}
                        // autoFocus={true}
                      />
                    </FielGroup>
                    <FielGroup>
                      <InputText
                        ref={confirmedPasswordInputRef}
                        name="confirmedPassword"
                        icon="lock"
                        placeholder="Confirme a senha"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        returnKeyType="send"
                        onSubmitEditing={() =>
                          formUpdatePasswordRef.current?.submitForm()
                        }
                      />
                    </FielGroup>
                    <ButtonDefault
                      loading={loading}
                      onPress={() =>
                        formUpdatePasswordRef.current?.submitForm()
                      }>
                      Salvar
                    </ButtonDefault>
                  </FormSignin>
                </FormContainer>
              </>
            )}
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ResetPassword;
