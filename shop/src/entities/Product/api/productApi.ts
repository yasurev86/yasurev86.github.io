import { createApi } from '@reduxjs/toolkit/query/react';
import { generateStrapiQuery, baseQuery } from '@/shared/api';
import { IGetProductsResponse } from '@/entities/Product';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery,
	endpoints: build => ({
		getProducts: build.query<
			IGetProductsResponse,
			{
				page?: number;
				pageSize?: number;

				start?: number;
				limit?: number;
				ids?: number[];
				detailed?: boolean;
				filters?: object | null;
				[key: string]: any;
			}
		>({
			query: ({
				page,
				pageSize,
				start,
				limit,
				ids = [],
				detailed = false,
				filters = {},
				...rest
			}) =>
				generateStrapiQuery('catalog/products', {
					pagination: {
						page,
						pageSize,
						start,
						limit,
					},
					ids,
					detailed,
					filters,
					...rest,
				}),
			transformResponse: (response: IGetProductsResponse) => response,
		}),
	}),
});

export const { useGetProductsQuery } = productApi;
