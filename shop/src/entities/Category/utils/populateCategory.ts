import { nestedPopulate } from '@/shared/api';

export interface IPopulatedCategory {
	fields: ['name', 'slug', 'id'] | ['id'];
	populate: {
		parent?: IPopulatedCategory;
		discount: {
			fields: ['value', 'type'];
		};
	};
}

export const populateCategory = (
	count: number,
	config: {
		detailed?: boolean;
		withDiscount?: boolean;
		type?: 'parent' | 'childs';
	} = {
		detailed: false,
		withDiscount: true,
	},
) =>
	nestedPopulate<IPopulatedCategory>(
		count,
		config.detailed ? ['name', 'slug', 'id'] : ['id'],
		config.withDiscount
			? {
					discount: {
						fields: ['value', 'type'],
					},
				}
			: {},
		config.type || 'parent',
	);
