import { IOrder } from '@/entities/Order';
import { IStrapiPagination } from '@/shared/api';

export interface IGetOrdersResponse {
	data: IOrder[];
	pagination: IStrapiPagination;
}

export interface IGetOrderResponse {
	data: IOrder;
	pagination: IStrapiPagination;
}
