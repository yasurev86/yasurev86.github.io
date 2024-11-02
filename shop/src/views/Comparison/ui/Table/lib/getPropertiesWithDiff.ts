import { TPropertyType } from '@/entities/Category';
import { IProperties } from '../../../model/IProperties';
import { IDetailedProduct } from '../../../model/IDetailedProduct';

export const getPropertiesWithDiff = (
	properties: IProperties,
	products: IDetailedProduct[],
) => {
	const entries: [string, { name: string; type: TPropertyType }][] =
		Object.entries(properties).reduce(
			(
				acc: [string, { name: string; type: TPropertyType }][],
				[key, value],
			) => {
				const uniqueValues = new Set(
					products.map(
						({ properties }) => properties[key] ?? undefined,
					),
				);

				if (uniqueValues.size === 1) return acc;
				return [...acc, [key, value]];
			},
			[],
		);
	return Object.fromEntries(entries);
};
