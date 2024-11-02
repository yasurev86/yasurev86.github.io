import { IStrapiMedia, IStrapiPopulate, IStrapiResponse } from '@/shared/api';
import { TIconName } from '@/shared/ui/components/Icon';

export interface IGetCatalogSectionResponse
	extends IStrapiResponse<{
		parts: {
			id: number;
			category: IStrapiPopulate<{
				slug: string;
				name: string;
				icon: TIconName;
			}>;
			banner: {
				product_variant: IStrapiPopulate<{
					color: IStrapiPopulate<{ slug: string }>;
					product: IStrapiPopulate<{ slug: string }>;
				}>;
				image: IStrapiMedia;
			};
			blocks: {
				id: number;
				caption_category: IStrapiPopulate<{
					slug: string;
					name: string;
				}>;
				products: IStrapiPopulate<{ name: string; slug: string }, true>;
			}[];
		}[];
	}> {}
