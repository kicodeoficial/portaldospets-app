import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {Form} from '@unform/mobile';

// Configurações CSS padrão para Containers
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 4% 6%;
  padding-top: ${getStatusBarHeight()}px;
  background-color: ${({theme}) => theme.colors.backgroundPrimary};

  flex-direction: column;
`;

export const LogotipoImage = styled.Image`
  margin-top: 8%;
  max-width: 200px;
  max-height: 68.5px;
`;

export const Information = styled.View`
  padding: 0 6%;
  margin: 14% 0;
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
`;

export const FormContainer = styled.View`
  width: 100%;
  padding: 0% 6%;
`;

export const FormSignUp = styled(Form)``;

export const FielGroup = styled.View`
  margin-bottom: 12px;
`;

export const TermsOfUseView = styled.View`
  padding: 5% 0;
`;

export const TermsOfUseText = styled.Text`
  text-align: center;
  font-size: ${({theme}) => theme.fontSize.paragraphNormal}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsMedium};
  color: ${({theme}) => theme.colors.textDark};
`;

export const TermsOfUseLink = styled.Text`
  font-size: ${({theme}) => theme.fontSize.paragraphNormal}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsMedium};
  color: ${({theme}) => theme.colors.textRedPrimary};
`;
