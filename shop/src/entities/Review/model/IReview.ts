import { IUser } from '@/entities/User';

export interface IReview {
	id: number;
	user: Pick<IUser, 'id' | 'name' | 'surname' | 'avatar'>;
	rating: number;
	date: string;
	text: string;
	approved: boolean;
}

export interface IReviewReply {
	id: number;
	user: Pick<IUser, 'id' | 'name' | 'surname' | 'avatar'>;
	date: string;
	text: string;
	branch: number;
	reply_to: string;
}
