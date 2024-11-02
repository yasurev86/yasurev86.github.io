import { createApi } from '@reduxjs/toolkit/query/react';
import {
	generateStrapiQuery,
	IStrapi,
	IStrapiResponse,
	baseQueryWithReauth,
} from '@/shared/api';
import { IGetFavouritesResponse } from '../model/Responses';

export const favouriteApi = createApi({
	reducerPath: 'favouriteApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['favourite'],
	endpoints: build => ({
		getFavourites: build.query<{ [key: number]: number }, undefined>({
			query: () =>
				generateStrapiQuery('favourites', {
					populate: {
						product_variant: {
							fields: 'id',
						},
					},
				}),
			providesTags: ['favourite'],
			transformResponse: (response: IGetFavouritesResponse) =>
				Object.fromEntries(
					response.data.map(
						({ id, attributes: { product_variant } }) => [
							product_variant.data.id,
							id,
						],
					),
				),
		}),
		removeFavourite: build.mutation<IStrapi<{}>, number>({
			query: id => ({
				method: 'DELETE',
				url: process.env.NEXT_PUBLIC_API_URL + `favourites/${id}`,
			}),
			transformResponse: (response: IStrapiResponse<{}>) => response.data,
			invalidatesTags: ['favourite'],
		}),
		removeManyFavourites: build.mutation<IStrapi<{}>, number[]>({
			query: ids => ({
				method: 'POST',
				url: process.env.NEXT_PUBLIC_API_URL + `favourites/deleteMany`,
				body: {
					ids,
				},
			}),
			transformResponse: (response: IStrapiResponse<{}>) => response.data,
			invalidatesTags: ['favourite'],
		}),
		addFavourite: build.mutation<IStrapi<{}>, number>({
			query: id => ({
				method: 'POST',
				url: process.env.NEXT_PUBLIC_API_URL + `favourites`,
				body: {
					data: {
						product_variant: id,
					},
				},
			}),
			transformResponse: (response: IStrapiResponse<{}>) => response.data,
			invalidatesTags: ['favourite'],
		}),
	}),
});

export const {
	useGetFavouritesQuery,
	useAddFavouriteMutation,
	useRemoveFavouriteMutation,
	useRemoveManyFavouritesMutation,
} = favouriteApi;
