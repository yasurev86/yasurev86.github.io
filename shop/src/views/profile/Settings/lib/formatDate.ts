export const formatDate = (date: {
	day: string;
	month: string;
	year: string;
}): string | null => {
	const { day, month, year } = date;

	if (!day || !month || !year) return '-';
	try {
		// Need translate
		return new Date([month + 1, day, year].join('.')).toLocaleDateString(
			'ru-RU',
			{
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			},
		);
	} catch (e) {
		return null;
	}
};
