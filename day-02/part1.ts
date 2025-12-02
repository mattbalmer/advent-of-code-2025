import { Execute } from './format';
import { sum } from '@utils/array';
import { toInt } from '@utils/numbers';

const minInvalid = (n: number): number => {
  const str = `${n}`;
  if (str.length % 2 === 0) {
    const left = str.slice(0, str.length / 2);
    return toInt(`${left}${left}`);
  } else {
    const count = Math.floor(str.length / 2);
    const left = Math.pow(10, count);
    return toInt(`${left}${left}`);
  }
}

const nextInvalid = (n: number): number => {
  const str = `${n}`;
  const base = toInt(str.slice(0, str.length / 2));
  const v = toInt(`${base + 1}${base + 1}`);
  console.log(' ', n, str, base, v);
  return v;
}

const findInvalids = (min: number, max: number): number[] => {
  const invalids = [];
  let inv = minInvalid(min);
  console.log('inv', min, max, inv);
  while (inv <= max) {
    invalids.push(inv);
    inv = nextInvalid(inv);
    console.log(' ', inv);
  }
  return invalids;
}

export const execute: Execute = (lines) => {
  const invalids = lines.map(range => findInvalids(...range));
  console.log(`invalids`, invalids);

  return sum(
    lines.reduce((invalids, range) => {
      return [
        ...invalids,
        ...findInvalids(...range),
      ]
    }, [])
  )
}