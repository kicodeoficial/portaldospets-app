const removeMask = (cellphoneMask: string): string => {
  /**
   * Entrada: +55 (21) 9 98899-8899
   * Saída: 5521988998899
   */
  return cellphoneMask.replace(/[^\d]+/g, '');
};

export default {
  removeMask,
};
