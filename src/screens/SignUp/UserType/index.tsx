import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {ImagePetShop} from '../../../assets/images';
import {HeaderBack, ButtonDefault} from '../../../components';
import values from '../../../config/values';
import {useAuth} from '../../../hooks/auth';
import {IUser} from '../../../interfaces';
import {notifyFlashMessage} from '../../../utils/notifications';
import theme from '../../../styles/themes/light';

import {
  Container,
  LogotipoImage,
  Information,
  InformationTitle,
  InformationSubtitle,
  InformationLegend,
  Options,
  OptionView,
  OptionTouch,
  OptionTouchText,
  Buttons,
} from './styles';

const SignUpUserType: React.FC = () => {
  const {goBack} = useNavigation();
  const {navigate} = useNavigation();
  const {updateUserLocalStorage} = useAuth();
  const [role, setRole] = useState<string>('');

  const changerole = (value: string) => {
    setRole(value);
  };

  const notifyFieldRequired = () => {
    notifyFlashMessage({
      type: 'warning',
      title: 'Não foi possível continuar',
      message: 'Por favor, selecione uma das opções.',
    });
  };

  useEffect(() => {
    const user: IUser = {
      role,
    };
    updateUserLocalStorage(user);
  }, [role]);

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
            <LogotipoImage source={ImagePetShop} />
            <Information>
              <InformationTitle>Cadastre-se</InformationTitle>
              <InformationSubtitle>
                E encontre o serviço mais próximo de você ou comece a anunciar.
              </InformationSubtitle>
              <InformationLegend>
                Para prosseguir, selecione o tipo de conta que deseja cadastrar
                e clique no botão continuar:
              </InformationLegend>
            </Information>
            <Options>
              <OptionView>
                <OptionTouch
                  isActive={role === values.user.role.customer}
                  onPress={() => changerole(values.user.role.customer)}>
                  <MaterialIcons
                    name="pets"
                    size={30}
                    color={
                      role === values.user.role.customer
                        ? theme.colors.textRedPrimary
                        : theme.colors.textSecondary
                    }
                  />
                  <OptionTouchText
                    isActive={role === values.user.role.customer}>
                    Quero ser cliente
                  </OptionTouchText>
                </OptionTouch>
                <OptionTouch
                  isActive={role === values.user.role.professional}
                  onPress={() => changerole(values.user.role.professional)}>
                  <IconFontAwesome
                    name="user-md"
                    size={30}
                    color={
                      role === values.user.role.professional
                        ? theme.colors.textRedPrimary
                        : theme.colors.textSecondary
                    }
                  />
                  <OptionTouchText
                    isActive={role === values.user.role.professional}>
                    Quero anunciar
                  </OptionTouchText>
                </OptionTouch>
              </OptionView>
            </Options>
            <Buttons>
              <ButtonDefault
                onPress={() =>
                  role ? navigate('Welcome') : notifyFieldRequired()
                }>
                Continuar
              </ButtonDefault>
            </Buttons>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUpUserType;
