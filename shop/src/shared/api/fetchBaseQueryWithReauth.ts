import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
	prepareHeaders: (headers: Headers) => {
		return headers;
	},
});

export const baseQueryWithAuth = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
	prepareHeaders: (headers: Headers) => {
		const token = Cookies.get('token');
		if (token) headers.set('Authorization', `Bearer ${token}`);
		return headers;
	},
});
export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQueryWithAuth(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQueryWithAuth(
			{
				url: '/token/refresh',
				method: 'POST',
				credentials: 'include',
			},
			api,
			extraOptions,
		);

		if (refreshResult.data) {
			result = await baseQueryWithAuth(args, api, extraOptions);
		}
	}
	return result;
};
