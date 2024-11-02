'use client';

import { FC, AllHTMLAttributes, useContext } from 'react';
import c from './Item.module.scss';
import clsx from 'clsx';
import { useToggle } from '@/shared/hooks';
import { ReviewBtn, ToggleBtn } from '@/shared/ui/components/Btns';
import Review from '@/entities/Review/ui/Review';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { useModal } from '@/shared/store/hooks';
import { writeReviewModalName } from '@/features/modals/WriteReviewModal';
import Link from 'next/link';
import { getImagePath } from '@/shared/utils';
import { IUserReview } from '@/entities/Review';
import { i18n } from '@/shared/i18n';

type IProps = IUserReview & Omit<AllHTMLAttributes<HTMLDivElement>, 'id'>;

const ItemHasReview: FC<IProps> = ({
	id,
	name,
	image,
	review,
	slug,
	className,
	...props
}) => {
	const { isActive, toggle } = useToggle();
	return (
		<div
			className={clsx(c.wrapper, c['_with-review'], className)}
			{...props}
		>
			<div
				className={clsx(c.header, isActive && c['header--active'])}
				onClick={toggle}
			>
				<div className={c.info}>
					<img src={getImagePath(image)} alt="" loading="lazy" />
					<Link
						target={'_blank'}
						className={c.name}
						href={`/product/${slug}`}
					>
						{name}
					</Link>
				</div>
				<ToggleBtn isActive={isActive} />
			</div>
			{isActive && review && (
				<div className={c.body}>
					<div
						className={clsx(
							c.reviewStatus,
							review.approved && c._approved,
						)}
					>
						{review.approved
							? i18n('approved_review')
							: i18n('approve_pending')}
					</div>
					<Review
						variant_id={id}
						id={review.id}
						user={review.user}
						date={review.createdAt}
						rating={review.rating}
						text={review.text}
						approved={review.approved}
						canReply={false}
						canDelete={true}
					/>
				</div>
			)}
		</div>
	);
};

const ItemHasNoReview: FC<Omit<IProps, 'review'>> = ({
	id,
	name,
	image,
	slug,
	className,
	...props
}) => {
	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);

	const { open } = useModal(writeReviewModalName);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.header}>
				<div className={c.info}>
					<img src={getImagePath(image)} alt="" loading="lazy" />
					<div>
						<Link
							target={'_blank'}
							className={c.name}
							href={`/product/${slug}`}
						>
							{name}
						</Link>
						{maw767 && (
							<ReviewBtn
								className={c.reviewBtn}
								onClick={() => open({ id })}
							/>
						)}
					</div>
				</div>
				{!maw767 && <ReviewBtn onClick={() => open({ id })} />}
			</div>
		</div>
	);
};

const Item: FC<IProps> = ({ review, className, ...props }) => {
	if (review) return <ItemHasReview review={review} {...props} />;
	return <ItemHasNoReview {...props} />;
};

export default Item;
