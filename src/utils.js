import { isValid, format, getYear, differenceInCalendarYears } from 'date-fns';
import numeral from 'numeral';

export const isDateValid = dateString => isValid(new Date(dateString));

export const formatDate = date => format(date, 'MMM Do, YYYY');

export const formatYear = date => getYear(date);

export const getAge = (birth, death) => differenceInCalendarYears(death || new Date(), birth);

export const formatMoney = money => numeral(money).format('$0a');

export const getPercentageGain = (startValue, endValue) => {
  const value = (endValue - startValue) / startValue;
  return numeral(value).format('0%');
};

export const isPositiveInteger = value => Number.isInteger(+value) && +value > 0;

export const isWithinRange = (min, max) => value =>
  Number.isFinite(value) && value > min && value < max;

export const doStringsMatch = (a, b) => a.toLowerCase() === b.toLowerCase();

export const truncateString = numberOfChars => string =>
  (string.length > numberOfChars ? `${string.slice(0, numberOfChars)}…` : string);

export const sanitizeString = (...regExps) => string =>
  [...regExps]
    .reduce((prevString, regExp) => prevString.replace(regExp, ' '), string)
    .trim();

export const joinArrayBy = separator => array => array.join(separator);

export const filterArrayDuplicates = array => [...new Set(array)];

export const identity = x => x;

