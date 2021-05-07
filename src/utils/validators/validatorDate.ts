import { parseISO, isAfter, isBefore, addYears, addMonths } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const LIMIT_YEARS = 18;

const isOfAge = (date: string): boolean => {
  const parsed_date = parseISO(date);
  const zn_date = zonedTimeToUtc(parsed_date, 'America/Sao_Paulo');
  const eighteen_years_later = addYears(zn_date, LIMIT_YEARS);
  // const eighteen_years_later2 = format(
  //   eighteen_years_later,
  //   'dd/MM/YYYY HH:mm',
  //   {
  //     timeZone: 'America/Sao_Paulo',
  //   },
  // );
  return isBefore(eighteen_years_later, new Date());
};

export default {
  isOfAge,
};
