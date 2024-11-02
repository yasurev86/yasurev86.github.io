import { IProduct } from '@/entities/Product';
import { TPropertyType } from '@/entities/Category';

export interface IDetailedProductBeforePropertiesMap extends IProduct {
	properties: {
		property: { id: number; type: TPropertyType };
		regular_value: string | null;
		boolean_value: string | null;
		property_values: { id: number; value: string }[];
	}[];
}
