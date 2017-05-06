import { isValid, format, getYear, differenceInCalendarYears } from 'date-fns';

export const isDateValid = dateString => isValid(new Date(dateString));

export const formatDate = date => format(date, 'MMM Do, YYYY');

export const formatYear = date => getYear(date);

export const getAge = (birth, death) => differenceInCalendarYears(death || new Date(), birth);

export const isPositiveInteger = value => Number.isInteger(+value) && +value > 0;

export const isWithinRange = (min, max) => value =>
  Number.isFinite(value) && value > min && value < max;

export const doStringsMatch = (a, b) => a.toLowerCase() === b.toLowerCase();

export const getStringBeforeChar = char => string => string.split(char, 1)[0];

export const joinArrayBy = separator => array => array.join(separator);

export const filterArrayDuplicates = array => [...new Set(array)];

export const identity = x => x;

