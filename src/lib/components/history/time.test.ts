import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatRelativeTime } from './time';

describe('formatRelativeTime tests', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2026-01-01 12:00:00'));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('works for under a minute', () => {
		expect(formatRelativeTime(new Date('2026-01-01 11:59:40'))).toBe('just now');
	});

	it('works for minutes', () => {
		expect(formatRelativeTime(new Date('2026-01-01 11:55:00'))).toBe('5 minutes ago');
	});

	it('works for hours', () => {
		expect(formatRelativeTime(new Date('2026-01-01 10:00:00'))).toBe('2 hours ago');
	});
});
