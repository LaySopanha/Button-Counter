import { describe, it, expect } from 'vitest';
import { clampDecrement } from './clamp-decrement';

describe('clampDecrement', () => {
	it('decrements normally: 5 -> 4', () => {
		expect(clampDecrement(5)).toBe(4);
	});
	it('reaches zero: 1 -> 0', () => {
		expect(clampDecrement(1)).toBe(0);
	});
	it('stays at zero: 0 -> 0', () => {
		expect(clampDecrement(0)).toBe(0);
	});
});
