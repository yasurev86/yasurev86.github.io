import { IStrapiPopulate } from '@/shared/api';
import { ICategory } from '@/entities/Category';

export interface ILink {
	id: number;
	text?: string;
	link?: string;
	prebuild_page?: string;
	category: IStrapiPopulate<ICategory>;
	product: IStrapiPopulate<{ slug: string; name: string }>;
	text_page: IStrapiPopulate<{ slug: string; name: string }>;
}
