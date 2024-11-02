export interface IStrapiPagination {
	// 1 variant
	limit: number;
	start: number;

	// 2 variant
	page: number;
	pageSize: number;
	pageCount: number;

	total: number;
}

export interface IStrapiMeta {
	pagination: IStrapiPagination;
}

export interface IStrapiResponse<
	T,
	isArray extends boolean = false,
	isNotStrapiEntity extends boolean = false,
> {
	data: isNotStrapiEntity extends false
		? isArray extends true
			? IStrapi<T>[]
			: IStrapi<T>
		: isArray extends true
			? T[]
			: T;
	meta: IStrapiMeta;
}

export interface IStrapiPopulate<T, isResponseArray extends boolean = false> {
	data: isResponseArray extends true ? IStrapi<T>[] : IStrapi<T>;
}

export interface IStrapiAttributes {
	createdAt: string;
	publishedAt: string;
	updatedAt: string;
}

type TStrapiMediaAttributes = {
	ext: string;
	hash: string;
	mime: string;
	name: string;
	path: string;
	size: number;
	url: string;
	height: number;
	width: number;
};

export type IStrapiMediaAttributes = {
	alternativeText: string | null;
	caption: string | null;
	previewUrl: string | null;
	provider: string;
	provider_metadata: string;
	formats: {
		[key in
			| 'large'
			| 'medium'
			| 'small'
			| 'thumbnail']: TStrapiMediaAttributes;
	};
} & TStrapiMediaAttributes;

export type IStrapiMedia<isMediaArray extends boolean = false> =
	IStrapiPopulate<IStrapiMediaAttributes, isMediaArray>;

export interface IStrapi<T> {
	id: number;
	attributes: IStrapiAttributes & T;
}
