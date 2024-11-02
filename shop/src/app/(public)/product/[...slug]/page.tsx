import { FC } from 'react';
import Product from '@/views/Product';
import { EAvailability, IProduct, IDiscount, IColor } from '@/entities/Product';
import {
	populateCategory,
	ICategory,
	TPropertyType,
} from '@/entities/Category';
import {
	fetchApi,
	IStrapiMedia,
	IStrapiPopulate,
	flatPopulated,
} from '@/shared/api';
import { notFound } from 'next/navigation';

type IProps = {
	params: {
		slug: string;
	};
};

const ProductPage: FC<IProps> = async ({ params: { slug }, ...props }) => {
	// TODO: slugify
	const response = await fetchApi<
		Omit<
			IProduct,
			'discount' | 'colors' | 'id' | 'image' | 'color' | 'availability'
		> & {
			image: IStrapiMedia;
			discount: IStrapiPopulate<IDiscount>;
			color: IStrapiPopulate<IColor>;
			available: boolean;
			product: IStrapiPopulate<{
				slug: string;
				description: string;
				overview: IStrapiMedia<true>;
				category: ICategory;
				discount: IStrapiPopulate<IDiscount>;
				properties: {
					id: number;
					regular_value: string;
					boolean_value: boolean;
					property: IStrapiPopulate<{
						name: string;
						type: TPropertyType;
					}>;
					property_values: IStrapiPopulate<{ value: string }, true>;
					value: string;
				}[];
				product_variants: IStrapiPopulate<
					{
						slug: string;
						color: IStrapiPopulate<{
							name: string;
							value: string;
							slug: string;
						}>;
					},
					true
				>;
			}>;
		},
		true
	>(`product-variants`, {
		pagination: {
			limit: 1,
		},
		filters: {
			product: {
				slug: {
					$eq: slug[0],
				},
			},
			...(slug.length == 2
				? {
						color: {
							slug: {
								$eq: slug[1],
							},
						},
					}
				: {}),
		},
		fields: [
			'name',
			'price',
			'code',
			'rating',
			'reviews_count',
			'available',
		],
		populate: {
			color: true,
			image: true,
			slider: true,
			discount: {
				fields: ['value', 'type'],
			},
			product: {
				fields: ['id', 'description', 'slug'],
				populate: {
					overview: true,
					discount: {
						fields: ['value', 'type'],
					},
					category: populateCategory(5, {
						detailed: true,
						withDiscount: true,
					}),
					product_variants: {
						fields: ['slug'],
						populate: {
							color: {
								fields: ['name', 'slug', 'value'],
							},
						},
					},
					properties: {
						populate: {
							property: {
								fields: ['id', 'type', 'name'],
							},
							property_values: {
								fields: ['id', 'value'],
							},
						},
					},
				},
			},
		},
	});

	if (!response.data || !response.data.length) return notFound();

	const data = (({
		id,
		attributes: {
			price,
			image,
			discount: variant_discount,
			product,
			createdAt,
			updatedAt,
			publishedAt,
			available,
			color,
			...attributes
		},
	}) => {
		const categories = flatPopulated<ICategory, 'parent'>(
			// TODO: fix
			// @ts-ignore
			product.data.attributes.category,
			'parent',
		);

		const discounts = {
			category: categories
				.map(({ discount }) => discount.data?.attributes)
				.filter(el => !!el)[0],
			product: product.data.attributes.discount.data?.attributes,
			variant: variant_discount.data?.attributes,
		};

		const discount =
			discounts.variant || discounts.product || discounts.category;

		const properties = product.data.attributes.properties.map(
			({
				id,
				property,
				regular_value,
				boolean_value,
				property_values,
			}) => {
				const type = property.data.attributes.type as TPropertyType;
				let value;

				switch (type) {
					case 'predefined': {
						value = property_values.data
							.map(({ attributes: { value } }) => value)
							.join(', ');
						break;
					}
					case 'boolean': {
						value = boolean_value ? 'Да' : 'Нет';
						break;
					}
					case 'range': {
						value = regular_value;
						break;
					}
				}

				return { id: id, name: property.data.attributes.name, value };
			},
		);

		return {
			id,
			categories: categories
				.map(({ discount, ...rest }) => ({
					...rest,
				}))
				.reverse() as IProduct['categories'],
			description: product.data.attributes.description,
			colors: product.data.attributes.product_variants.data
				.map(
					({
						attributes: {
							color: { data },
						},
					}) => {
						if (!data) return undefined;

						const {
							id,
							attributes: { name, value, slug },
						} = data;

						return {
							id,
							name,
							value,
							slug: product.data.attributes.slug + '/' + slug,
						};
					},
				)
				.filter(el => !!el) as IColor[],
			oldPrice: discount ? price : undefined,
			price: discount
				? discount.type == 'flat'
					? price - discount.value
					: Math.round(price * (discount.value / 100))
				: price,
			discount,
			overview: product.data.attributes.overview,
			image: image.data?.attributes,
			color: color.data?.id,
			availability: available
				? EAvailability.inStock
				: EAvailability.outOfStock,
			properties,
			...attributes,
		};
	})(response.data[0]);

	return <Product slug={slug} data={data} />;
};

export default ProductPage;
