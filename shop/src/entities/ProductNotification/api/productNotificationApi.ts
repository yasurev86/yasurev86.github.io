import { createApi } from '@reduxjs/toolkit/query/react';
import {
	generateStrapiQuery,
	baseQueryWithReauth,
	IStrapi,
	IStrapiResponse,
} from '@/shared/api';
import { IGetProductNotificationsResponse } from '@/entities/ProductNotification';

export const productNotificationApi = createApi({
	reducerPath: 'productNotificationApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['productNotification'],
	endpoints: build => ({
		getNotificationId: build.query<number | undefined, number>({
			query: id =>
				generateStrapiQuery('product-notifications', {
					pagination: {
						limit: 1,
					},
					filter: {
						product_variant: {
							id,
						},
					},
				}),
			providesTags: ['productNotification'],
			transformResponse: (response: IGetProductNotificationsResponse) => {
				if (response.data.length > 0) {
					return response.data[0].id;
				}
				return undefined;
			},
		}),
		removeProductNotification: build.mutation<IStrapi<{}>, number>({
			query: id => ({
				method: 'DELETE',
				url:
					process.env.NEXT_PUBLIC_API_URL +
					`product-notifications/${id}`,
			}),
			transformResponse: (response: IStrapiResponse<{}>) => response.data,
			invalidatesTags: ['productNotification'],
		}),
		addProductNotification: build.mutation<IStrapi<{}>, number>({
			query: id => ({
				method: 'POST',
				url: process.env.NEXT_PUBLIC_API_URL + `product-notifications`,
				body: {
					data: {
						product_variant: id,
					},
				},
			}),
			transformResponse: (response: IStrapiResponse<{}>) => response.data,
			invalidatesTags: ['productNotification'],
		}),
	}),
});

export const {
	useGetNotificationIdQuery,
	useRemoveProductNotificationMutation,
	useAddProductNotificationMutation,
} = productNotificationApi;
