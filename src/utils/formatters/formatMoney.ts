const fromNumberToPrice = (amount: number): string => {
  /**
   * Entrada: 19.7
   * Saída: R$ 19,90
   */
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
};

export default { fromNumberToPrice };
