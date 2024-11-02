export const linkPopulate = {
	populate: {
		category: {
			fields: ['slug', 'name'],
		},
		product: {
			fields: ['slug', 'name'],
		},
		text_page: {
			fields: ['slug', 'name'],
		},
	},
};
