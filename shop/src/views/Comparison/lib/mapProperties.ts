import { IDetailedProductBeforePropertiesMap } from '../model/IDetailedProductBeforePropertiesMap';
import { TPropertyType } from '@/entities/Category';
import { IDetailedProduct } from '../model/IDetailedProduct';

export const mapProperties = (
	detailedProducts: IDetailedProductBeforePropertiesMap[] | undefined,
): IDetailedProduct[] | undefined => {
	if (!detailedProducts) return undefined;

	return detailedProducts.map(({ properties, ...attributes }) => ({
		...attributes,
		properties: Object.fromEntries(
			properties.map(
				({
					property,
					regular_value,
					boolean_value,
					property_values,
				}) => {
					const type = property.type as TPropertyType;
					let value;

					switch (type) {
						case 'predefined': {
							value = property_values
								.map(({ value }) => value)
								.join(', ');
							break;
						}
						case 'boolean': {
							value = boolean_value;
							break;
						}
						case 'range': {
							value = regular_value;
							break;
						}
					}

					return [property.id, value];
				},
			),
		),
	}));
};
