const capitalizedFirstLetter = (text: string): string => {
  /**
   * Entrada: melancia açucarada
   * Saída: Melancia açucarada
   */
  const firstLetter = text.substr(0, 1);
  const rest = text.substr(1);

  const textFormated = `${firstLetter.toUpperCase()}${rest}`;

  return textFormated;
};

export default {
  capitalizedFirstLetter,
};
