import { createApi } from '@reduxjs/toolkit/query/react';
import {
	generateStrapiQuery,
	baseQueryWithReauth,
	IStrapi,
	IStrapiPagination,
} from '@/shared/api';
import {
	IGetReviewRepliesResponse,
	IGetReviewsResponse,
	IUserReview,
	IReview,
	IReviewReply,
} from '@/entities/Review';

export const reviewApi = createApi({
	reducerPath: 'reviewApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['myReviews', 'reviews', 'replies'],
	endpoints: build => ({
		getUserReviews: build.query<
			{ data: IUserReview[]; pagination: IStrapiPagination },
			number
		>({
			query: limit => generateStrapiQuery('reviews/me'),
			providesTags: ['myReviews'],
		}),
		getReviews: build.query<
			{ data: IReview[]; pagination: IStrapiPagination },
			{ limit?: number; variant_id: number; sort: string }
		>({
			query: ({ limit = 20, variant_id, sort }) =>
				generateStrapiQuery('reviews', {
					pagination: {
						limit: limit,
					},
					sort,
					filters: {
						approved: {
							$eq: true,
						},
						product_variant: {
							$eq: variant_id,
						},
					},
					populate: {
						user: true,
					},
				}),
			providesTags: (result, error, { variant_id }) => [
				{ type: 'reviews', variant_id },
			],
			// @ts-ignore
			transformResponse: ({
				data,
				meta: { pagination },
			}: IGetReviewsResponse) => ({
				pagination,
				data: data.map(({ id, attributes }) => ({
					id,
					...attributes,
					date: attributes.createdAt,
					user: {
						id: attributes.user.data.id,
						...attributes.user.data.attributes,
					},
				})),
			}),
		}),
		addReview: build.mutation<
			IStrapi<{}>,
			{
				product_variant: number;
				rating: number;
				text: string;
			}
		>({
			query: data => ({
				method: 'POST',
				url: process.env.NEXT_PUBLIC_API_URL + `reviews`,
				body: {
					data,
				},
			}),
			invalidatesTags: ['myReviews'],
		}),
		removeReview: build.mutation<
			IStrapi<{}>,
			{
				variant_id: number;
				id: number;
			}
		>({
			invalidatesTags: (result, error, { variant_id }) => [
				{ type: 'reviews', variant_id },
				'myReviews',
			],
			query: ({ id }) => ({
				method: 'DELETE',
				url: process.env.NEXT_PUBLIC_API_URL + `reviews/${id}`,
			}),
		}),

		getReviewReplies: build.query<
			{ data: IReviewReply[]; pagination: IStrapiPagination },
			{ limit?: number; id: number }
		>({
			query: ({ limit = 20, id }) =>
				generateStrapiQuery('review-replies', {
					pagination: {
						limit: limit,
					},
					filters: {
						branch: {
							$eq: id,
						},
					},
					populate: {
						user: true,
						reply_to: {
							fields: ['name', 'surname'],
						},
						branch: {
							fields: ['id'],
						},
					},
				}),
			providesTags: (result, error, { id }) => [
				{ type: 'replies', branch: id },
			],
			// @ts-ignore
			transformResponse: ({
				data,
				meta: { pagination },
			}: IGetReviewRepliesResponse) => ({
				pagination,
				data: data.map(
					({
						id,
						attributes: {
							branch,
							createdAt,
							user,
							reply_to,
							...attributes
						},
					}) => ({
						id,
						...attributes,
						date: createdAt,
						user: {
							id: user.data.id,
							...user.data.attributes,
						},
						reply_to: reply_to.data
							? reply_to.data.attributes.name +
								' ' +
								reply_to.data.attributes.surname
							: null,
						branch: branch.data.id,
					}),
				),
			}),
		}),
		addReviewReply: build.mutation<
			IStrapi<{}>,
			{
				branch: number;
				reply_to: number;
				text: string;
			}
		>({
			invalidatesTags: (result, error, { branch }) => [
				{ type: 'replies', branch },
			],
			query: data => ({
				method: 'POST',
				url: process.env.NEXT_PUBLIC_API_URL + `review-replies`,
				body: {
					data,
				},
			}),
		}),
		removeReviewReply: build.mutation<
			IStrapi<{}>,
			{
				branch: number;
				id: number;
			}
		>({
			invalidatesTags: (result, error, { branch }) => [
				{ type: 'replies', branch },
			],
			query: ({ id }) => ({
				method: 'DELETE',
				url: process.env.NEXT_PUBLIC_API_URL + `review-replies/${id}`,
			}),
		}),
	}),
});

export const {
	useAddReviewMutation,
	useGetUserReviewsQuery,
	useGetReviewsQuery,
	useAddReviewReplyMutation,
	useGetReviewRepliesQuery,
	useRemoveReviewReplyMutation,
	useRemoveReviewMutation,
} = reviewApi;
