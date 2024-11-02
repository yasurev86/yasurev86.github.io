import { IProduct } from '@/entities/Product';

export interface IDetailedProduct extends IProduct {
	properties: { [id: string]: string | boolean | null };
}
