import { Execute } from './format';

const START = 50;
const UPPER = 100;

const dialUp = (n: number, a: number): [number, number] => {
  const v = (n + a) % UPPER;
  const whole = Math.floor(a / UPPER);
  const partial = v < n && v !== 0 ? 1 : 0;
  const r = whole + partial;
  return [r, v];
}

const dialDown = (n: number, a: number): [number, number] => {
  const v = (UPPER + ((n + a) % UPPER)) % UPPER
  const whole = Math.floor(Math.abs(a) / UPPER);
  const partial = v > n && n !== 0 ? 1 : 0;
  const r = whole + partial;
  return [r, v];
}

export const execute: Execute = (lines) => {
  let count = 0;
  let value = START;

  for(const [side, amount] of lines) {
    const sign = side === 'L' ? -1 : 1;
    let [r, v] = side === 'R' ? dialUp(value, amount * sign) : dialDown(value, amount * sign);
    count += r;
    value = v;

    if (value === 0) {
      count++;
    }
  }

  return count;
}