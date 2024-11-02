import { IStrapiResponse } from '@/shared/api';
import { ICategory } from '@/entities/Category';

export interface IGetCategoriesResponse
	extends IStrapiResponse<Omit<ICategory, 'id'>, true> {}
