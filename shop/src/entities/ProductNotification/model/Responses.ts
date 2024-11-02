import { IStrapiPopulate, IStrapiResponse } from '@/shared/api';

export interface IGetProductNotificationsResponse
	extends IStrapiResponse<
		{
			product_variant: IStrapiPopulate<{ id: number }>;
		},
		true
	> {}
