import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
// import {getBottomSpace} from 'react-native-iphone-x-helper'

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

export const BannerImage = styled.Image`
  /* min-width: 130px;
  min-height: 109.68px;
  width: 50%;
  height: 42%; */
  max-width: 260px;
  max-height: 219.35px;
`;

export const InformationView = styled.View`
  align-items: center;
  padding: 20% 10% 45%;
`;

export const InformationTitle = styled.Text`
  font-size: ${({theme}) => theme.fontSize.titleSmall}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsMedium};
  color: ${({theme}) => theme.colors.textRedPrimary};
  margin-bottom: 10px;
`;

export const InformationDescription = styled.Text`
  font-size: ${({theme}) => theme.fontSize.subtitleSmall}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsLight};
  color: ${({theme}) => theme.colors.textDark};
  text-align: center;
  line-height: 28px;
  opacity: 0.7;
`;

export const ButtonsView = styled.View`
  width: 100%;
`;
