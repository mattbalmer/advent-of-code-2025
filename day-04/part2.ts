import { Execute } from './format';
import { Coordinate } from '@utils/grid';

const countAdjacent = (grid: string[][], [cx, cy]: Coordinate, q: string): number => {
  let count = 0;
  for(let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      const nx = x + cx;
      const ny = y + cy;

      if (nx === cx && ny === cy) {
        continue;
      }
      if (ny < 0 || ny >= grid.length) {
        continue;
      }
      if (nx < 0 || nx >= grid[ny].length) {
        continue;
      }
      if (grid[ny][nx] === q) {
        count++;
      }
    }
  }
  return count;
}

const remove = (input: string[][]): [
  grid: string[][],
  count: number,
] => {
  const output = JSON.parse(JSON.stringify(input)) as string[][];
  let count = 0;

  for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[y].length; x++) {
      if (input[y][x] === '@') {
        const adjacentRolls = countAdjacent(input, [x, y], '@');
        if (adjacentRolls < 4) {
          count++;
          output[y][x] = '.';
        }
      }
    }
  }

  return [
    output,
    count,
  ];
}

export const execute: Execute = (lines) => {
  let count = 0;
  let grid = lines;
  let removed;

  do {
    [grid, removed] = remove(grid);
    count += removed;
  } while (removed !== 0)

  return count;
}