import { createApi } from '@reduxjs/toolkit/query/react';
import {
	generateStrapiQuery,
	IStrapiPagination,
	baseQuery,
} from '@/shared/api';
import { ISearchItem } from '@/entities/Search';
import { IGetSearchResponse } from '@/entities/Search';

export const searchApi = createApi({
	reducerPath: 'searchApi',
	baseQuery: baseQuery,
	endpoints: build => ({
		getSearchItems: build.query<
			{ data: ISearchItem[]; pagination: IStrapiPagination },
			{
				query: string;
				page: number;
				pageSize: number;
				recently: number[];
			}
		>({
			query: ({ query, recently, page, pageSize }) =>
				generateStrapiQuery('search', {
					pagination: {
						page,
						pageSize,
					},
					query,
					recently,
				}),
			// @ts-ignore
			transformResponse: ({
				data,
				meta: { pagination },
			}: IGetSearchResponse) => ({ data, pagination }),
		}),
	}),
});

export const { useGetSearchItemsQuery } = searchApi;
