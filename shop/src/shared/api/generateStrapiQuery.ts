import { stringify } from 'qs';

export const generateStrapiQuery = (
	pluralApiId: string,
	query: object = {},
) => {
	return (
		pluralApiId +
		(query ? '?' + stringify(query, { encodeValuesOnly: true }) : '')
	);
};
