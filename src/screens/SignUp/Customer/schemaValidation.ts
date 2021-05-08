import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('Por favor, informe seu nome completo.'),
  cpf: Yup.string().required('Por favor, informe seu CPF.'),
  dateOfBirth: Yup.string().required(
    'Por favor, informe sua data de nascimento.',
  ),
  email: Yup.string()
    .required('Por favor, informe seu endereço de e-mail.')
    .email('O e-mail digitado precisa ser válido.'),
  cellphone: Yup.string().required('Por favor, informe seu número de celular.'),
  password: Yup.string().required('Por favor, defina sua senha de acesso.'),
  confirmedPassword: Yup.string()
    .required('Por favor, confirme a senha digitada.')
    .when('password', {
      is: value => !!value.length,
      then: Yup.string().required('Por favor, confirme a senha digitada.'),
      otherwise: Yup.string(),
    })
    .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais.'),
});
