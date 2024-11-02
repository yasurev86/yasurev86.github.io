import { IProduct } from '@/entities/Product';
import { IStrapiMedia } from '@/shared/api';

export interface IFullProductData extends IProduct {
	id: number;
	description: string;
	overview: IStrapiMedia<true>;
	properties: { id: number; name: string; value: string }[];
}
