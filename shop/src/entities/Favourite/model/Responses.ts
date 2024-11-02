import { IStrapiPopulate, IStrapiResponse } from '@/shared/api';

export interface IGetFavouritesResponse
	extends IStrapiResponse<
		{
			product_variant: IStrapiPopulate<{ id: number }>;
		},
		true
	> {}
