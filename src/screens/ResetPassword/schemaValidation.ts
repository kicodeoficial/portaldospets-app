import * as Yup from 'yup';

export const schemaSendEmail = Yup.object().shape({
  email: Yup.string()
    .required('Por favor, informe um endereço de e-mail.')
    .email('O e-mail digitado precisa ser válido'),
});

export const schemaValidationCode = Yup.object().shape({
  code: Yup.string()
    .required('Por favor, informe um endereço de e-mail.')
    .length(4, 'O código precisa ser de 4 dígitos'),
});

export const schemaUpdatePassword = Yup.object().shape({
  password: Yup.string().required('Por favor, defina uma nova senha'),
  confirmedPassword: Yup.string()
    .required('Por favor, confirme sua senha')
    .when('password', {
      is: value => !!value.length,
      then: Yup.string().required('Por favor, confirme sua senha'),
      otherwise: Yup.string(),
    })
    .oneOf([Yup.ref('password')], 'As senhas não correspondem.'),
});
