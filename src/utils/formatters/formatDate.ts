const addMask = (date: string): string => {
  /**
   * Entrada: 1996-03-20
   * Saída: 20/03/1996
   */
  const array_date_formated = date.split('-');
  const day = array_date_formated[2];
  const month = array_date_formated[1];
  const year = array_date_formated[0];
  return `${day}/${month}/${year}`;
};

const removeMask = (date: string): string => {
  /**
   * Entrada: 20/03/1996
   * Saída: 1996-03-20
   */
  const array_date_formated = date.split('/');
  const day = array_date_formated[0];
  const month = array_date_formated[1];
  const year = array_date_formated[2];
  return `${year}-${month}-${day}`;
};

export default {
  addMask,
  removeMask,
};
