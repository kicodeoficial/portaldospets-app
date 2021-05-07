export default {
  recoverPassword: {
    codeSentHowManyTimes: 3, // Limite de vezes que o código será enviado por e-mail
    waitingTimeToResendCodeInSeconds: 59, // Tempo de espera para habilitar o reenvio do código
    standbyTimeInHours: 2, // Tempo de espera para tentar recuperar senha após atingir limite de tentativas
    expirationTimeInMinutes: 3, // Tempo limite que o código de recuperação da senha é válido
  },
};
