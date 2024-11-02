import { createApi } from '@reduxjs/toolkit/query/react';
import { generateStrapiQuery, baseQuery } from '@/shared/api';
import { ICatalogSection } from '@/entities/CatalogSection';
import { IGetCatalogSectionResponse } from '../model/Responses';

export const catalogSectionApi = createApi({
	reducerPath: 'catalogSectionApi',
	baseQuery,
	endpoints: build => ({
		getCatalogSection: build.query<ICatalogSection, undefined>({
			query: () =>
				generateStrapiQuery('catalog-section', {
					populate: {
						parts: {
							populate: {
								category: {
									fields: ['slug', 'name', 'icon'],
								},
								banner: {
									populate: {
										product_variant: {
											fields: ['id', 'color'],
											populate: {
												color: {
													fields: ['slug'],
												},
												product: {
													fields: ['slug'],
												},
											},
										},
										image: true,
									},
								},
								blocks: {
									populate: {
										caption_category: {
											fields: ['slug', 'name'],
										},
										products: {
											fields: ['id', 'name', 'slug'],
										},
									},
								},
							},
						},
					},
				}),
			// @ts-ignore
			transformResponse: (response: IGetCatalogSectionResponse) =>
				response.data.attributes.parts.map(
					({ category, banner, blocks }) => ({
						category: {
							id: category.data.id,
							...category.data.attributes,
						},
						blocks: blocks.map(
							({ id, caption_category, products }) => ({
								id,
								caption_category: {
									...caption_category.data.attributes,
								},
								products: products.data.map(
									({ id, attributes: { name, slug } }) => ({
										id,
										name,
										slug,
									}),
								),
							}),
						),
						banner: banner
							? {
									link: `/product/${banner.product_variant.data.attributes.product.data.attributes.slug + '/' + banner.product_variant.data.attributes.color.data.attributes.slug}`,
									image: banner.image,
								}
							: undefined,
					}),
				),
		}),
	}),
});

export const { useGetCatalogSectionQuery } = catalogSectionApi;
