import { parseISO, isAfter, isBefore, addYears, addMonths } from 'date-fns';
import { format, zonedTimeToUtc } from 'date-fns-tz';

const nextMonth = (): string => {
  /**
   * Saída: 2021-04-25 00:14
   */
  const zn_date = zonedTimeToUtc(new Date(), 'America/Sao_Paulo');
  const next_month = addMonths(zn_date, 1);

  const hour = next_month.getHours();
  const min = next_month.getMinutes();
  const day = next_month.getDate();
  const month = next_month.getMonth() + 1;
  const year = next_month.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  } ${hour < 10 ? `0${hour}` : hour}:${min}`;
};

const now = (): string => {
  /**
   * Saída: 2021-03-25 00:14
   */
  const zn_date = zonedTimeToUtc(new Date(), 'America/Sao_Paulo');

  const hour = zn_date.getHours();
  const min = zn_date.getMinutes();
  const day = zn_date.getDate();
  const month = zn_date.getMonth() + 1;
  const year = zn_date.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  } ${hour < 10 ? `0${hour}` : hour}:${min}`;
};

export default {
  now,
  nextMonth,
};
