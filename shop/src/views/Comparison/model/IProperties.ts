import { TPropertyType } from '@/entities/Category';

export interface IProperties {
	[key: string]: { name: string; type: TPropertyType };
}
