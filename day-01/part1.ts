import { Execute } from './format';

const START = 50;
const UPPER = 100;

const dial = (v: number): number => {
  return v < 0
    ? (UPPER + (v % UPPER)) % UPPER
    : v % UPPER;
}

export const execute: Execute = (lines) => {
  let count = 0;
  let value = START;

  for(const [side, amount] of lines) {
    const sign = side === 'L' ? -1 : 1;
    value = dial(value + sign * amount);

    if (value === 0) {
      count++;
    }
  }

  return count;
}