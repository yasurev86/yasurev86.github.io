import { IProduct } from '@/entities/Product';
import { IStrapiPagination } from '@/shared/api';

export interface IGetProductsResponse {
	data: IProduct[];
	pagination: IStrapiPagination;
}
