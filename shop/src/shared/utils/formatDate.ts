const months = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
];

const daysOfWeek = [
	'Воскресенье',
	'Понедельник',
	'Вторник',
	'Среда',
	'Четверг',
	'Пятница',
	'Суббота',
];

export const formatDate = (timestamp: number | string): string => {
	const date = new Date(timestamp);

	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	// Формируем строку для вывода
	return day + ' ' + month + ' ' + year;
};
