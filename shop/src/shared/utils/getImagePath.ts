import { IStrapi, IStrapiMediaAttributes } from '@/shared/api';

export const getImagePath = <T extends boolean = false>(
	media?: IStrapi<IStrapiMediaAttributes> | IStrapiMediaAttributes,
	full: T = false as T,
): T extends true ? { default: string; thumbnail: string } : string => {
	const getPath = (url?: string): string =>
		process.env.NEXT_PUBLIC_STRAPI_URL + (url ?? '');

	if (!media) {
		if (full) {
			return {
				default: getPath('/blank.png'),
				thumbnail: getPath('/blank.png'),
			} as T extends true
				? { default: string; thumbnail: string }
				: never;
		}
		return getPath('/blank.png') as T extends true ? never : string;
	}

	// @ts-ignore
	const m = media?.attributes ? media.attributes : media;

	if (full) {
		return {
			default: getPath(m.url),
			thumbnail: getPath(m.formats.thumbnail.url),
		} as T extends true ? { default: string; thumbnail: string } : never;
	}

	return getPath(m.url) as T extends true ? never : string;
};
