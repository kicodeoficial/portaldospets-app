import styled, {css} from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {Form} from '@unform/mobile';

interface IResendCodeText {
  isDisabled?: boolean;
}

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
  margin: 14% 0 10%;
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
  margin-bottom: 20px;
`;

export const ResendCode = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-bottom: 6%;
`;

export const ResendCodeTouch = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 2% 4%;
`;

export const ResendCodeText = styled.Text<IResendCodeText>`
  color: ${({theme}) => theme.colors.textRedPrimary};
  font-size: ${({theme}) => theme.fontSize.paragraphNormal}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsLight};

  ${props =>
    props.isDisabled &&
    css`
      color: ${({theme}) => theme.colors.textSecondary};
    `}
`;

export const ResendCodeTimer = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.fontSize.paragraphNormal}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsLight};
`;
