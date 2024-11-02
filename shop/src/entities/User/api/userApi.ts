import { createApi } from '@reduxjs/toolkit/query/react';
import {
	generateStrapiQuery,
	IStrapi,
	IStrapiResponse,
	baseQueryWithReauth,
} from '@/shared/api';
import { IUser } from '../model/IUser';
import { IAddress } from '../model/IAddress';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['user', 'addresses'],
	endpoints: build => ({
		getUserData: build.query<
			IUser & { auths: { provider: string }[] },
			undefined
		>({
			query: () =>
				generateStrapiQuery('users/me', {
					populate: ['auths'],
				}),
			providesTags: ['user'],
			transformResponse: (
				response: IUser & { auths: { provider: string }[] },
			) => response,
		}),
		changeUserData: build.mutation<
			IUser,
			{ id: number; data: Partial<IUser> }
		>({
			query: ({ id, data }) => ({
				method: 'PUT',
				url: process.env.NEXT_PUBLIC_API_URL + `users/${id}`,
				body: {
					...data,
				},
			}),
			transformResponse: (response: IUser) => response,
			invalidatesTags: ['user'],
		}),
		getDeliveryAddresses: build.query<IAddress[], undefined>({
			query: () => generateStrapiQuery('delivery-addresses', {}),
			providesTags: ['addresses'],
			transformResponse: (
				response: IStrapiResponse<Omit<IAddress, 'id'>, true>,
			) =>
				response.data.map(
					({
						id,
						attributes: { createdAt, updatedAt, ...attributes },
					}) => ({
						id,
						...attributes,
					}),
				),
		}),
		removeDeliveryAddress: build.mutation<IStrapi<IAddress>, number>({
			query: id => ({
				method: 'DELETE',
				url:
					process.env.NEXT_PUBLIC_API_URL +
					`delivery-addresses/${id}`,
			}),
			transformResponse: (response: IStrapiResponse<IAddress>) =>
				response.data,
			invalidatesTags: ['addresses'],
		}),
		addDeliveryAddresses: build.mutation<
			IStrapi<IAddress>,
			Omit<IAddress, 'user' | 'id'>[]
		>({
			query: data => ({
				method: 'POST',
				url:
					process.env.NEXT_PUBLIC_API_URL +
					`delivery-addresses/addMany`,
				body: {
					data,
				},
			}),
			transformResponse: (response: IStrapiResponse<IAddress>) =>
				response.data,
			invalidatesTags: ['addresses'],
		}),
		updateDeliveryAddresses: build.mutation<
			IStrapi<IAddress>,
			{ [id: number]: Partial<IAddress> }
		>({
			query: data => ({
				method: 'PUT',
				url:
					process.env.NEXT_PUBLIC_API_URL +
					`delivery-addresses/updateMany`,
				body: {
					data,
				},
			}),
			transformResponse: (response: IStrapiResponse<IAddress>) =>
				response.data,
			invalidatesTags: ['addresses'],
		}),
		deleteAccount: build.mutation<IStrapi<{}>, number>({
			query: id => ({
				method: 'DELETE',
				url: process.env.NEXT_PUBLIC_API_URL + `users/${id}`,
			}),
		}),
		changeAvatar: build.mutation<IStrapi<{}>, FormData>({
			query: body => ({
				method: 'POST',
				url: process.env.NEXT_PUBLIC_API_URL + `users/change-avatar`,
				body,
			}),
			invalidatesTags: ['user'],
		}),
	}),
});

export const {
	useGetUserDataQuery,
	useChangeUserDataMutation,
	useGetDeliveryAddressesQuery,
	useRemoveDeliveryAddressMutation,
	useAddDeliveryAddressesMutation,
	useUpdateDeliveryAddressesMutation,
	useDeleteAccountMutation,
	useChangeAvatarMutation,
} = userApi;
