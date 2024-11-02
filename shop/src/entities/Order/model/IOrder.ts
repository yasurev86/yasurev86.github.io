import { TStatus } from '@/entities/Order';
import { IStrapiMediaAttributes } from '@/shared/api';

export interface IOrderItem {
	product_variant_id: number;
	name: string;
	image: IStrapiMediaAttributes;
	code: string;
	sum: number;
	discountSum: number;
	quantity: number;
	slug: string;
	hasReview: boolean;
}

export interface IOrder {
	id: number;
	status: TStatus;
	createdAt: string;
	sum: number;
	items: IOrderItem[];

	delivery: 'pickup' | 'delivery';
	payment: 'onReceive' | 'online';

	deliveryAddress: string;
	pickupAddress: string;

	customer_name: string;
	customer_email: string;
	receiver_name: string;
	phone: string;
	email: string;
}
