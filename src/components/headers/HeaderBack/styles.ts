import styled from 'styled-components/native';

import theme from '../../../styles/themes/light';

export const Container = styled.View`
  width: 100%;
  padding-top: 2%;
  position: absolute;
  top: 0;
`;

export const Button = styled.TouchableOpacity`
  max-width: 40px;
  padding: 12px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  max-width: 16px;
  max-height: 16px;
`;

export const Label = styled.Text``;
