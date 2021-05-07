import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string()
    .required('Por favor, informe um endereço de e-mail.')
    .email('O e-mail digitado precisa ser válido'),
  password: Yup.string().min(6, 'Sua senha precisa ter no mínimo 6 dígitos'),
});
