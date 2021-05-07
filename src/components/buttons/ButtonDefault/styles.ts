import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({theme}) => theme.colors.backgroundRedPrimary};
  padding: 15.5px 10px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.textWhitePrimary};
  font-size: ${({theme}) => theme.fontSize.subtitleSmall}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsMedium};
  text-align: center;
`;
