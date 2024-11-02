import { FC } from 'react';
import Comparison from '@/views/Comparison';
import { IPopulatedCategory } from '@/entities/Category';
import {
	generateStrapiQuery,
	flatPopulated,
	nestedPopulate,
} from '@/shared/api';
import { ICategory } from '@/entities/Category';
import { CantGetServerData } from '@/shared/ui/components';

type IProps = { params: { category: string } };
const ComparisonPage: FC<IProps> = async ({ params: { category } }) => {
	const categoryResponse = await fetch(
		process.env.STRAPI_API_URL +
			generateStrapiQuery('categories', {
				fields: ['id', 'name', 'slug'],
				filters: {
					slug: {
						$eq: category,
					},
				},
				pagination: {
					limit: 1,
				},
				populate: {
					properties: {
						fields: ['name', 'type'],
					},
					parent: nestedPopulate<IPopulatedCategory>(
						5,
						['id'],
						{
							properties: {
								fields: ['name', 'type'],
							},
						},
						'parent',
					),
				},
			}),
	)
		.then(res => res.json())
		.catch(err => undefined);

	if (!categoryResponse?.data || categoryResponse?.data.length == 0)
		return <CantGetServerData />;

	const categories = (
		flatPopulated(
			{ data: categoryResponse.data[0] },
			'parent',
		) as ICategory[]
	).reverse();

	const properties = Object.fromEntries(
		categories
			.map(({ properties }) =>
				properties.data.map(({ id, attributes }) => ({
					id,
					...attributes,
				})),
			)
			.flat()
			.map(({ id, ...rest }) => [id, rest]),
	);

	return (
		<Comparison
			properties={properties}
			category={(({ id, attributes: { name } }) => ({ id, name }))(
				categoryResponse.data[0],
			)}
		/>
	);
};

export default ComparisonPage;
