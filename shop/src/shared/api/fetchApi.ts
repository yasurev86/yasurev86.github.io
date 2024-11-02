import { generateStrapiQuery, IStrapiResponse } from '@/shared/api';

export const fetchApi = async <
	T,
	isResponseArray extends boolean = false,
	isResponseNotStrapiFormat extends boolean = false,
>(
	pluralApiId: string,
	query: object = {},
	cacheDuration: number = 0,
): Promise<
	isResponseNotStrapiFormat extends false
		? IStrapiResponse<T, isResponseArray>
		: isResponseArray extends true
			? T[]
			: T
> => {
	return await fetch(
		process.env.STRAPI_API_URL + generateStrapiQuery(pluralApiId, query),
		{ next: { revalidate: cacheDuration } },
	)
		.then(response => response.json())
		.catch(err => ({ data: null, error: err }));
};
