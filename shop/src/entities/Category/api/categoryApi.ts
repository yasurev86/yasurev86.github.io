import { createApi } from '@reduxjs/toolkit/query/react';
import { generateStrapiQuery, baseQuery } from '@/shared/api';
import { ICategory } from '@/entities/Category';
import { IGetCategoriesResponse } from '../model/Responses';

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery,
	endpoints: build => ({
		getCategories: build.query<
			ICategory[],
			{ count?: number; ids?: number[]; detailed?: boolean }
		>({
			query: ({ count, ids = [], detailed = false }) =>
				generateStrapiQuery('categories', {
					filters: { id: { $in: ids } },
					...(!!count ? { pagination: { limit: count } } : {}),
					fields: [
						'id',
						'name',
						'slug',
						...(detailed ? ['icon'] : []),
					],
					...(detailed ? { populate: 'image' } : {}),
				}),
			transformResponse: (response: IGetCategoriesResponse) =>
				response.data.map(({ id, attributes }) => ({
					id,
					...attributes,
				})),
		}),
	}),
});

export const { useGetCategoriesQuery } = categoryApi;
