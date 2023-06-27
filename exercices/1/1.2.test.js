import { describe, expect, it } from 'vitest';

import { part1, part2 } from './1';

describe('Exercice 1.1', () => {
  it('should return 74394', () => {
    expect(part1('./data.txt')).toBe(74394);
  });
  it('should return 74394', () => {
    expect(part2('./data.txt')).toBe(212836);
  });
});
