import React, {Fragment} from 'react';
import {SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ImageVeterinary} from '../../assets/images';
import {ButtonDefault, ButtonOutline} from '../../components';

import {
  Container,
  BannerImage,
  InformationView,
  InformationTitle,
  InformationDescription,
  ButtonsView,
} from './styles';

const Welcome: React.FC = () => {
  const {navigate} = useNavigation();

  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Container>
          <BannerImage source={ImageVeterinary} />
          <InformationView>
            <InformationTitle>Bem-vindo(a)!</InformationTitle>
            <InformationDescription>
              Tudo o que a saúde do seu Pet precisa, aqui!
            </InformationDescription>
          </InformationView>
          <ButtonsView>
            <ButtonDefault onPress={() => navigate('SignIn')}>
              Entrar
            </ButtonDefault>
            <ButtonOutline onPress={() => navigate('SignUpUserType')}>
              Cadastre-se
            </ButtonOutline>
          </ButtonsView>
        </Container>
      </SafeAreaView>
    </Fragment>
  );
};

export default Welcome;
