import styled, {css} from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface IButtonPersonType {
  isActive: boolean;
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
  max-width: 260px;
  max-height: 219.35px;
`;

export const Information = styled.View`
  padding: 0 6%;
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
  margin-bottom: 6%;
`;

export const InformationLegend = styled.Text`
  font-size: ${({theme}) => theme.fontSize.paragraphBig}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsLight};
  color: ${({theme}) => theme.colors.textDark};
  text-align: justify;
  line-height: 25px;
  opacity: 0.5;
`;

export const Options = styled.View`
  padding: 0 8% 4%;
`;

export const OptionView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16% 0;
`;

export const OptionTouch = styled.TouchableOpacity<IButtonPersonType>`
  justify-content: center;
  align-items: center;
  width: 50%;
  max-width: 200px;
  padding: 5% 10%;
  margin: 0 1%;
  border: 1px solid ${({theme}) => theme.colors.textTertiary};
  border-radius: 10px;

  ${props =>
    props.isActive &&
    css`
      border: 1px solid ${({theme}) => theme.colors.textRedPrimary};
    `}
`;

export const OptionTouchText = styled.Text<IButtonPersonType>`
  font-size: ${({theme}) => theme.fontSize.paragraphBig}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsLight};
  color: ${({theme}) => theme.colors.textSecondary};
  text-align: center;
  line-height: 22px;
  margin-top: 5px;

  ${props =>
    props.isActive &&
    css`
      color: ${({theme}) => theme.colors.textRedPrimary};
    `}
`;

export const Buttons = styled.View`
  width: 100%;
  padding: 0 6%;
`;
