import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {ImagePetShop} from '../../../assets/images';
import {configValues} from '../../../config';
import {HeaderBack, ButtonDefault} from '../../../components';
import {useAuth} from '../../../hooks/auth';
import {IUser} from '../../../models';
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
  const {updateUserLocalStorage, user} = useAuth();
  const [role, setRole] = useState<string>(user?.role || '');
  const [nameRouteScreen, setNameRouteScreen] = useState<string>(
    'SignUpCustomer',
  );

  const changeRole = (value: string) => {
    setRole(value);
    setNameRouteScreen(
      value === configValues.user.role.customer ? 'SignUpCustomer' : 'Welcome',
    );
  };

  const notifyFieldRequired = () => {
    notifyFlashMessage({
      type: 'warning',
      title: 'Não foi possível continuar',
      message: 'Por favor, selecione uma das opções.',
    });
  };

  useEffect(() => {
    const userSaved: IUser = {
      role,
    };
    updateUserLocalStorage(userSaved);
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
                  isActive={role === configValues.user.role.customer}
                  onPress={() => changeRole(configValues.user.role.customer)}>
                  <MaterialIcons
                    name="pets"
                    size={30}
                    color={
                      role === configValues.user.role.customer
                        ? theme.colors.textRedPrimary
                        : theme.colors.textSecondary
                    }
                  />
                  <OptionTouchText
                    isActive={role === configValues.user.role.customer}>
                    Quero ser cliente
                  </OptionTouchText>
                </OptionTouch>
                <OptionTouch
                  isActive={role === configValues.user.role.professional}
                  onPress={() =>
                    changeRole(configValues.user.role.professional)
                  }>
                  <IconFontAwesome
                    name="user-md"
                    size={30}
                    color={
                      role === configValues.user.role.professional
                        ? theme.colors.textRedPrimary
                        : theme.colors.textSecondary
                    }
                  />
                  <OptionTouchText
                    isActive={role === configValues.user.role.professional}>
                    Quero anunciar
                  </OptionTouchText>
                </OptionTouch>
              </OptionView>
            </Options>
            <Buttons>
              <ButtonDefault
                onPress={() =>
                  role ? navigate(nameRouteScreen) : notifyFieldRequired()
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
