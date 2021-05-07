import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {Form} from '@unform/mobile';

// Configurações CSS padrão para Containers
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 6%;
  padding-top: ${getStatusBarHeight()}px;
  background-color: ${({theme}) => theme.colors.backgroundPrimary};

  flex-direction: column;
`;

export const LogotipoImage = styled.Image`
  max-width: 200px;
  max-height: 68.5px;
`;

export const Information = styled.View`
  padding: 0 10%;
  margin: 14% 0 20%;
`;

export const InformationTitle = styled.Text`
  font-size: ${({theme}) => theme.fontSize.titleSmall}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsMedium};
  color: ${({theme}) => theme.colors.textRedPrimary};
  text-align: center;
  margin-bottom: 5%;
`;

export const InformationSubtitle = styled.Text`
  font-size: ${({theme}) => theme.fontSize.paragraphBig}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsLight};
  color: ${({theme}) => theme.colors.textDark};
  text-align: center;
  margin-bottom: 0;
`;

export const FormContainer = styled.View`
  width: 100%;
  padding: 0% 6%;
`;

export const FormSignin = styled(Form)``;

export const FielGroup = styled.View`
  margin-bottom: 12px;
`;

export const ForgetPassword = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-bottom: 6%;
`;

export const ForgetPasswordTouch = styled.TouchableOpacity`
  padding: 2% 4%;
`;

export const ForgetPasswordText = styled.Text`
  color: ${({theme}) => theme.colors.textRedPrimary};
  font-size: ${({theme}) => theme.fontSize.paragraphNormal}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsLight};
`;
