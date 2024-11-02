import { IStrapiResponse } from '@/shared/api';
import { ISearchItem } from '@/entities/Search';

export interface IGetSearchResponse
	extends IStrapiResponse<ISearchItem, true, true> {}
