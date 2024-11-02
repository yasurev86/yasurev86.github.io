'use client';

import { FC, AllHTMLAttributes } from 'react';
import c from './Reviews.module.scss';
import clsx from 'clsx';
import { IUserReview, useGetUserReviewsQuery } from '@/entities/Review';
import { ConditionalLoadingBlock } from '@/shared/ui/components';
import Item from './Item/Item';
import { useGetUserDataQuery } from '@/entities/User';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Reviews: FC<IProps> = ({ className, ...props }) => {
	const { data: reviews, isFetching: isReviewsFetching } =
		useGetUserReviewsQuery(20);
	const { data: userData, isFetching: isUserDataFetching } =
		useGetUserDataQuery(undefined);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<ConditionalLoadingBlock
				isLoading={isReviewsFetching || isUserDataFetching}
				data={reviews?.data}
				content={(items: IUserReview[]) =>
					userData &&
					items.map(({ id, review, ...data }) => (
						<Item
							key={id}
							id={id}
							review={
								review
									? {
											...review,
											user: userData,
										}
									: null
							}
							{...data}
						/>
					))
				}
				emptyResult={
					<div style={{ padding: 10 }}>
						{i18n('reviews_not_found')}
					</div>
				}
			/>
		</div>
	);
};

export default Reviews;
