'use client';

import React, { FC, AllHTMLAttributes, useState, useEffect } from 'react';
import c from './Reviews.module.scss';
import clsx from 'clsx';
import { useGetReviewsQuery } from '@/entities/Review/api/reviewApi';
import { Select, ConditionalLoadingBlock } from '@/shared/ui/components';
import { IReview } from '@/entities/Review';
import Review, { ReviewSkeleton } from '@/entities/Review';
import { useAppSelector } from '@/shared/store/hooks';
import { useInView } from 'react-intersection-observer';
import {
	selectorUserId,
	selectorUserIsLogged,
} from '@/shared/store/reducers/User';
import { i18n } from '@/shared/i18n';

type IProps = { id: number } & Omit<AllHTMLAttributes<HTMLDivElement>, 'id'>;
const Reviews: FC<IProps> = ({ id, className, ...props }) => {
	const [limit, setLimit] = useState(3);
	const [sort, setSort] = useState('createdAt:desc');
	const {
		data: reviews,
		isLoading,
		isFetching,
	} = useGetReviewsQuery({
		variant_id: id,
		limit,
		sort,
	});

	const userId = useAppSelector(selectorUserId);
	const isLogged = useAppSelector(selectorUserIsLogged);

	const { ref, inView, entry } = useInView({
		threshold: 0,
	});

	useEffect(() => {
		if (
			inView &&
			!isFetching &&
			reviews &&
			reviews.pagination.total > reviews.pagination.limit
		) {
			setLimit(cur => cur + 3);
		}
	}, [inView]);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<Select
				className={c.sort}
				placeholder={i18n('sort')}
				value={sort}
				onChange={value => setSort(value)}
				items={{
					'createdAt:asc': i18n('createdAt:asc'),
					'createdAt:desc': i18n('createdAt:desc'),
				}}
			/>
			<ConditionalLoadingBlock
				isLoading={isFetching}
				data={reviews?.data}
				fallback={
					<>
						{isLoading
							? Array.from({ length: 3 }).map((_, ind) => (
									<ReviewSkeleton
										variant={'withAvatar'}
										key={ind}
										className={c.review}
									/>
								))
							: reviews && (
									<>
										{reviews.data.map((data, ind) => (
											<Review
												{...data}
												variant_id={id}
												variant={'withAvatar'}
												className={c.review}
												canDelete={
													isLogged
														? data.user.id == userId
														: false
												}
											/>
										))}
									</>
								)}
					</>
				}
				content={(items: IReview[]) =>
					items && (
						<>
							{items.map((data, ind) => (
								<Review
									{...data}
									variant_id={id}
									variant={'withAvatar'}
									className={c.review}
									canDelete={
										isLogged
											? data.user.id == userId
											: false
									}
								/>
							))}
							{reviews?.pagination &&
								reviews.pagination.total >
									reviews.pagination.limit && (
									<div ref={ref} />
								)}
						</>
					)
				}
				emptyResult={<>{i18n('reviews_not_found')}</>}
			/>
		</div>
	);
};

export default Reviews;
