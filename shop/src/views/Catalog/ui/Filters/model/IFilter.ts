import { TPropertyType } from '@/entities/Category';
import { IColor } from '@/entities/Product';

export interface IFilter {
	id: string;
	name: string;
	type: TPropertyType | 'color';
	range: [min: number, max: number];
	values?: { [key: number]: { name: string; count: number } } | IColor[];
}
