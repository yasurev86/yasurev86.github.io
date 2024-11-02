import { IProduct } from '@/entities/Product';

export interface ICartItem
	extends Pick<
		IProduct,
		| 'image'
		| 'id'
		| 'name'
		| 'code'
		| 'oldPrice'
		| 'discount'
		| 'price'
		| 'slug'
	> {
	count: number;
}
