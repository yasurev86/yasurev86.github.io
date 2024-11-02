import { IUserInfo } from '@/views/Cart/model/IUserInfo';
import { IDeliveryAddress } from '@/views/Cart/model/IDeliveryAddress';

export interface ICartData {
	receiver?: Partial<IUserInfo>;
	payment: 'online' | 'onReceive';
	delivery: 'delivery' | 'pickup';
	deliveryAddress: IDeliveryAddress;
	pickupAddress: string;
}
