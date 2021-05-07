const check = (email: string): boolean => {
  // texto@texto.com === true
  // texto@texto === false
  // texto.com === false
  // texto === false
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export default {
  check,
};
