import {formatCardNumber} from './formatter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNullOrUndefined = (value: any) => {
  return value === null || value === undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmptyArray = (arr: any) => {
  return Array.isArray(arr) && arr.length === 0;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requiredValidator = (value: any) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return 'Esse campo é obrigatório';

  return !!String(value).trim().length || 'Esse campo é obrigatório';
};

export const isEqualCard = (first_card: string, second_card: string) => {
  if (formatCardNumber(first_card) === formatCardNumber(second_card)) {
    return true;
  }
  return false;
};
