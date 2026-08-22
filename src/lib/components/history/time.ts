export function formatRelativeTime(date: string | Date) {
	let time = new Date(date).getTime();
	let seconds = Math.floor((Date.now() - time) / 1000);

	if (seconds < 60) return 'just now';

	let mins = Math.floor(seconds / 60);
	if (mins === 1) return '1 minute ago';
	if (mins < 60) return mins + ' minutes ago';

	let hours = Math.floor(mins / 60);
	if (hours === 1) return '1 hour ago';
	if (hours < 24) return hours + ' hours ago';

	let days = Math.floor(hours / 24);
	if (days === 1) return '1 day ago';
	if (days < 30) return days + ' days ago';

	return new Date(date).toLocaleDateString();
}
