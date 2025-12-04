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

export const execute: Execute = (lines) => {
  let count = 0;

  for(let y = 0; y < lines.length; y++) {
    for(let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '@') {
        const adjacentRolls = countAdjacent(lines, [x, y], '@');
        if (adjacentRolls < 4) {
          count++;
        }
      }
    }
  }

  return count;
}