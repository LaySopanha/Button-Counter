export function clampDecrement(current: number): number {
	return current > 0 ? current - 1 : 0;
}
