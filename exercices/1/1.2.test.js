import { describe, expect, it } from 'vitest';

import { part1, part2 } from './1';

describe('Exercice 1.2', () => {
  it('part 1 should return 74394', () => {
    expect(part1('./data.txt')).toBe(74394);
  });
  it('part 2 should return 212836', () => {
    expect(part2('./data.txt')).toBe(212836);
  });
});
