import { ICategory } from '@/entities/Category';
import { IFullProductData } from '../model/IFullProductData';

export const getBreadcrumbs = (data: IFullProductData) => {
	return [
		...((data.categories as ICategory[]) || []).map(({ slug, name }) => ({
			link: `/catalog/${slug}`,
			name,
		})),
		{ link: '', name: data.name },
	];
};
