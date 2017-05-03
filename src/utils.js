import { isValid, format, getYear } from 'date-fns';

export const isDateValid = dateString => isValid(new Date(dateString));

export const formatDate = dateString => format(dateString, 'MMM Qo, YYYY');

export const formatYear = dateString => getYear(dateString);

export const isPositiveInteger = value => Number.isInteger(+value) && +value > 0;

export const isWithinRange = (min, max) => value =>
  Number.isFinite(value) && value > min && value < max;

export const doStringsMatch = (a, b) => a.toLowerCase() === b.toLowerCase();

export const joinArrayBy = separator => array => array.join(separator);

export const filterArrayDuplicates = array => [...new Set(array)];

export const identity = x => x;
