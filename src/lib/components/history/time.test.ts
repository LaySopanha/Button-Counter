import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatRelativeTime } from './time';

describe('formatRelativeTime tests', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2026-01-01T12:00:00Z'));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('works for under a minute', () => {
		expect(formatRelativeTime(new Date('2026-01-01T11:59:40Z'))).toBe('just now');
	});

	it('works for minutes', () => {
		expect(formatRelativeTime(new Date('2026-01-01T11:55:00Z'))).toBe('5 minutes ago');
	});

	it('works for hours', () => {
		expect(formatRelativeTime(new Date('2026-01-01T10:00:00Z'))).toBe('2 hours ago');
	});

	describe('with string timestamps (database format)', () => {
		it('works for under a minute with string', () => {
			expect(formatRelativeTime('2026-01-01T11:59:40Z')).toBe('just now');
		});

		it('works for minutes with string', () => {
			expect(formatRelativeTime('2026-01-01T11:55:00Z')).toBe('5 minutes ago');
		});

		it('works for hours with string', () => {
			expect(formatRelativeTime('2026-01-01T10:00:00Z')).toBe('2 hours ago');
		});
	});
});
