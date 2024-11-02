import { createApi } from '@reduxjs/toolkit/query/react';
import { generateStrapiQuery, baseQueryWithReauth } from '@/shared/api';
import {
	IOrder,
	IGetOrderResponse,
	IGetOrdersResponse,
} from '@/entities/Order';

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: baseQueryWithReauth,
	endpoints: build => ({
		getOrders: build.query<IOrder[], undefined>({
			query: ids => generateStrapiQuery('orders/me', {}),
			transformResponse: (response: IGetOrdersResponse) => response.data,
		}),
		getOrder: build.query<IOrder, { id?: number }>({
			query: ({ id }) => generateStrapiQuery('orders/me', { id: id }),
			transformResponse: (response: IGetOrderResponse) => response.data,
		}),
	}),
});

export const { useGetOrdersQuery, useGetOrderQuery } = orderApi;
