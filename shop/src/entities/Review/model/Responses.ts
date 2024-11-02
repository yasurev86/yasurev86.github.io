import { IStrapiPopulate, IStrapiResponse } from '@/shared/api';
import { IReview, IReviewReply } from '@/entities/Review';
import { IUser } from '@/entities/User';

export interface IGetReviewsResponse
	extends IStrapiResponse<
		Omit<IReview, 'id' | 'user'> & {
			user: IStrapiPopulate<Omit<IUser, 'id'>>;
		},
		true
	> {}

export interface IGetReviewRepliesResponse
	extends IStrapiResponse<
		Omit<IReviewReply, 'id' | 'reply_to' | 'branch'> & {
			user: IStrapiPopulate<Omit<IUser, 'id'>>;
			reply_to: IStrapiPopulate<Pick<IUser, 'name' | 'surname'>>;
			branch: IStrapiPopulate<{}>;
		},
		true
	> {}
