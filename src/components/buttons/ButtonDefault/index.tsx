import React from 'react';

import {TouchableOpacityProps} from 'react-native';

import {Container, Text} from './styles';

interface IButtonProps extends TouchableOpacityProps {
  children: string;
  loading?: boolean;
}

const ButtonDefault: React.FC<IButtonProps> = ({
  children,
  loading,
  ...rest
}) => {
  return (
    <Container {...rest}>
      {loading ? <Text>Carregando...</Text> : <Text>{children}</Text>}
    </Container>
  );
};

export default ButtonDefault;
