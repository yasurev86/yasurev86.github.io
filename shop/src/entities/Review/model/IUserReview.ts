import { IStrapiMediaAttributes } from '@/shared/api';
import { Nullable } from '@/shared/types/utilityTypes';
import { IReview } from '@/entities/Review';

export interface IUserReview {
	id: number;
	name: string;
	slug: string;
	image: IStrapiMediaAttributes;
	review: Nullable<Omit<IReview, 'date'> & { createdAt: string }>;
}
