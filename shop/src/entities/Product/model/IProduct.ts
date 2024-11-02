import { IStrapiMediaAttributes } from '@/shared/api';
import { EAvailability, IColor, IDiscount } from '@/entities/Product';
import { ICategory } from '@/entities/Category';

export interface IProduct {
	id: number;
	slug: string;
	image: IStrapiMediaAttributes;
	name: string;
	price: number;
	oldPrice?: number;
	discount?: IDiscount;
	rating: number;
	reviews_count: number;
	code: string;
	availability: EAvailability;
	color: number;
	colors: IColor[];
	slider: IStrapiMediaAttributes[];
	categories?: number[] | ICategory[];
}
