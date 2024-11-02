import { ICategory } from '@/entities/Category';
import { IProduct } from '@/entities/Product';

export const getCategoriesIds = (
	categories: IProduct['categories'],
): number[] =>
	categories ? (categories as ICategory[]).map(({ id }) => id) : [];
