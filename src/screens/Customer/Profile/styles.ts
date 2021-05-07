import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// Configurações CSS padrão para Containers
export const Container = styled.View`
  flex: 1;
  padding: 0 4%;
  padding-top: ${getStatusBarHeight(true)}px;
  background-color: ${({theme}) => theme.colors.backgroundPrimary};
`;

export const Title = styled.Text``;
