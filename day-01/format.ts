import { toInt } from '@utils/numbers';

export type Execute = (lines: [string, number][]) => number;

export const format = (raw: string): Parameters<Execute> => {
  return [
    raw.split('\n')
      .filter(l => !!l)
      .map(line => [
        line.slice(0, 1),
        toInt(line.slice(1))
      ]),
  ];
}