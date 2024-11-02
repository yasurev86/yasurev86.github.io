import React, { FC, AllHTMLAttributes } from 'react';
import c from './Rating.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import { i18n } from '@/shared/i18n';

const IconStar = () => <Icon name={'star'} className={c.star} />;

type IProps = {
	size?: 'default' | 'small';
	variant?: 'default' | 'full';
	rating: number;
	reviewsCount: number;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'id' | 'size'>;
const Rating: FC<IProps> = ({
	className,
	size = 'default',
	variant = 'default',
	rating,
	reviewsCount,
	...props
}) => {
	return (
		<div
			className={clsx(c.wrapper, c[`size--${size}`], className)}
			{...props}
		>
			{variant == 'full' && (
				<div className={c.stars}>
					{Array.from({ length: 5 }).map((_, ind) => (
						<IconStar key={ind} />
					))}
				</div>
			)}
			<div className={c.inner}>
				{variant == 'default' && <IconStar />}
				<span className={c.rating}>{rating.toFixed(1)}</span>
				<span className={c.reviewsCount}>
					{i18n('n_reviews', reviewsCount)}
				</span>
			</div>
		</div>
	);
};

export default Rating;
