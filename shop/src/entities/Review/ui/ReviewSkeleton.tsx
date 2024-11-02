import React, { AllHTMLAttributes, FC } from 'react';
import c from './Review.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import Skeleton from 'react-loading-skeleton';

const IconStar = ({ disabled }: { disabled: boolean }) => (
	<Icon
		name={'star'}
		className={clsx(c.star, disabled && c['star--disabled'])}
	/>
);

type IProps = {
	variant?: 'withAvatar' | 'default';
	canReply?: boolean;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'id'>;
const Review: FC<IProps> = ({
	variant = 'default',
	canReply = true,
	className,
	...props
}) => {
	return (
		<div
			className={clsx(c.wrapper, c[`variant--${variant}`], className)}
			{...props}
		>
			{variant == 'withAvatar' && (
				<div className={c.avatar}>
					<Skeleton height={'100%'} />
				</div>
			)}
			<div className={c.header}>
				<div className={c.headerMain}>
					<div className={c.meta}>
						<span className={c.name} style={{ flexBasis: '20%' }}>
							<Skeleton />
						</span>
						<span className={c.date} style={{ flexBasis: '10%' }}>
							<Skeleton />
						</span>
					</div>
					{/*{rating && (*/}
					{/*	<div className={c.rating}>*/}
					{/*		{Array.from({ length: 5 }).map((_, ind) => (*/}
					{/*			<IconStar*/}
					{/*				key={ind}*/}
					{/*				disabled={ind + 1 > rating}*/}
					{/*			/>*/}
					{/*		))}*/}
					{/*	</div>*/}
					{/*)}*/}
				</div>
			</div>
			<p className={c.text}>
				<Skeleton count={2} />
			</p>
			{canReply && (
				<button className={c.replyBtn}>
					<Icon name={'right-bottom'} />
					Ответить
				</button>
			)}
		</div>
	);
};

export default Review;
