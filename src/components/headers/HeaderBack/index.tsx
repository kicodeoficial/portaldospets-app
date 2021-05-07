import React from 'react';

import { ViewProps } from 'react-native';

import { IconArrowLeftDefault } from '../../../assets/icons';

import { Container, Button, Image, Label } from './styles';

interface IHeaderBackProps extends ViewProps {
  icon: string;
  onPressFunction: any;
}

const HeaderBack: React.FC<IHeaderBackProps> = ({ icon, onPressFunction }) => {
  return (
    <Container>
      <Button onPress={onPressFunction}>
        {icon && <Image source={IconArrowLeftDefault} />}
      </Button>
    </Container>
  );
};

export default HeaderBack;
