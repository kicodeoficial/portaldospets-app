import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  border: 1.5px solid ${({theme}) => theme.colors.backgroundRedPrimary};
  padding: 14px 10px;
  border-radius: 10px;
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.textRedPrimary};
  font-size: ${({theme}) => theme.fontSize.subtitleSmall}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsMedium};
  text-align: center;
`;
