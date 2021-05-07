import React from 'react';

import { TouchableOpacityProps } from 'react-native';

import { Container, Text } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  children: string;
}

const ButtonOutline: React.FC<IButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <Text>{children}</Text>
    </Container>
  );
};

export default ButtonOutline;
