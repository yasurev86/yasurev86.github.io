import { TIconName } from '@/shared/ui/components/Icon';
import { IStrapiMedia, IStrapiPopulate } from '@/shared/api';
import { IDiscount } from '@/entities/Product';

export interface IPropertyValue {
	value: string;
}

export type TPropertyType = 'boolean' | 'range' | 'predefined';

export interface IProperty {
	name: string;
	label: string;
	type: TPropertyType;
	property_values: IStrapiPopulate<IPropertyValue, true>;
}

export interface ICategory {
	id: number;
	slug: string;
	name: string;
	icon: TIconName;
	image: IStrapiMedia;

	parent: IStrapiPopulate<ICategory>;
	childs: IStrapiPopulate<ICategory, true>;
	discount: IStrapiPopulate<IDiscount>;
	properties: IStrapiPopulate<IProperty, true>;
}
