import { IStrapiPopulate } from '@/shared/api';

export const nestedPopulate = <T>(
	count: number = 1,
	fields: string[],
	base: Record<string, any>,
	key: string,
): T => {
	let current = {
		fields,
		populate: {
			...base,
		},
	};

	for (let i = 0; i < count; i++) {
		current = {
			fields: fields,
			populate: {
				...base,
				[key]: current,
			},
		};
	}

	return current as T;
};

interface IPopulated<T extends string>
	extends IStrapiPopulate<{ [key in T]: IPopulated<T> }> {}

export const flatPopulated = <StructType extends object, T extends string>(
	struct: IStrapiPopulate<
		StructType & { [key in T]: IPopulated<StructType & T> }
	>,
	key: T,
): StructType[] => {
	const result = [];

	let current = struct;
	const data = current?.data;

	if (data) {
		if (Array.isArray(data)) {
			data.forEach(
				({ id, attributes: { [key]: next, ...attributes } }) => {
					result.push(
						{ id, ...attributes },
						...(next?.data ? flatPopulated(next, key) : []),
					);
				},
			);
		} else {
			while (current.data) {
				const {
					id,
					attributes: { [key]: next, ...attributes },
				} = current.data;

				result.push({ id, ...attributes });

				// @ts-ignore
				current = next;
			}
		}
	}

	return result as StructType[];
};
