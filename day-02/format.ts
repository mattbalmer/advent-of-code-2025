import { toInt } from '@utils/numbers';

export type Execute = (lines: [number, number][]) => number;

export const format = (raw: string): Parameters<Execute> => {
  return [
    raw.split('\n')[0].split(',')
      .map(range =>
        range.split('-').map(v => toInt(v)) as [number, number]
      ),
  ];
}