const captions: { [key: string]: string } = {
	settings: 'Личные данные',
	orders: 'Мои заказы',
	favourites: 'Избранные',
	history: 'История просмотра',
	reviews: 'Мои отзывы',
};

export const getActivePageData = (
	path: string,
): {
	caption: string;
	activePage: string;
} => {
	const pathParts = path.split('/');
	const pageName = pathParts[pathParts.length - 1];

	return { caption: captions[pageName], activePage: pageName };
};
