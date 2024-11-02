import { FC } from 'react';
import Catalog from '@/views/Catalog';
import { IFilter } from '@/views/Catalog/ui/Filters';
import { flatPopulated, fetchApi } from '@/shared/api';
import { populateCategory } from '@/entities/Category';
import { ICategory } from '@/entities/Category';
import { CantGetServerData } from '@/shared/ui/components';

type IProps = {
	params: { category: string };
	searchParams: { producer: string };
};
const CatalogCategoryPage: FC<IProps> = async ({
	params: { category },
	searchParams: { producer },
}) => {
	let parentCategories = undefined,
		childCategories = undefined;

	if (category) {
		const categoriesResponse = await fetchApi<ICategory, true>(
			'categories',
			{
				filters: {
					slug: {
						$eq: category,
					},
				},
				pagination: {
					limit: 1,
				},
				populate: {
					parent: populateCategory(5, { detailed: true }),
					childs: populateCategory(5, {
						detailed: true,
						type: 'childs',
					}),
				},
			},
		);

		if (!categoriesResponse.data) return <CantGetServerData />;

		childCategories = flatPopulated(
			// @ts-ignore
			{ data: [categoriesResponse.data[0]] },
			'childs',
			// @ts-ignore
		).map(({ id }) => id);

		parentCategories = (
			flatPopulated(
				{ data: categoriesResponse.data[0] },
				'parent',
			) as ICategory[]
		).reverse();
	}

	const filtersAndCategories = await fetchApi<
		{
			filters: IFilter[];
			categories: [];
			producer_id?: number;
		},
		false,
		true
	>('catalog/filters', {
		slug: category && category[0],
		producer,
	});

	if (!filtersAndCategories) return <CantGetServerData />;

	return (
		<>
			<Catalog
				producer={filtersAndCategories?.producer_id}
				filters={filtersAndCategories}
				categories={childCategories}
				categoryName={
					parentCategories ? parentCategories[0].name : undefined
				}
				breadcrumbs={
					parentCategories &&
					parentCategories.map(({ name, slug }) => ({
						name,
						link: `/catalog/${slug}`,
					}))
				}
			/>
		</>
	);
};

export default CatalogCategoryPage;
