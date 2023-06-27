import { describe, expect, it } from 'vitest';

import { part1 } from './1';

describe('Exercice 1.1', () => {
  it('should return 0', () => {
    expect(part1('./data.txt')).toBe(74394);
  });
});
