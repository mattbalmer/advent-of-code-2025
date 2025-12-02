import { Execute } from './format';
import { sum } from '@utils/array';
import { toInt } from '@utils/numbers';

const minInvalidNextOrder = (n: number): number => {
  const str = `${n}`;
  const count = Math.floor(str.length / 2);
  const left = Math.pow(10, count);
  return toInt(`${left}${left}`);
}

const minInvalid = (n: number): number => {
  const str = `${n}`;
  if (str.length % 2 === 0) {
    const left = str.slice(0, str.length / 2);
    const a = toInt(`${left}${left}`);
    if (a >= n) {
      return a;
    }
    return minInvalidNextOrder(n);
  } else {
    return minInvalidNextOrder(n);
  }
}

const nextInvalid = (n: number): number => {
  const str = `${n}`;
  const base = toInt(str.slice(0, str.length / 2));
  return toInt(`${base + 1}${base + 1}`);
}

const findInvalids = (min: number, max: number): number[] => {
  const invalids = [];
  let inv = minInvalid(min);
  while (inv <= max) {
    invalids.push(inv);
    inv = nextInvalid(inv);
  }
  return invalids;
}

export const execute: Execute = (lines) => {
  return sum(
    lines
      .map(range =>
        findInvalids(...range)
      )
      .flat()
  );
}