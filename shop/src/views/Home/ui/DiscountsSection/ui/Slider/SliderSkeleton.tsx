'use client';

import { FC, AllHTMLAttributes, useContext } from 'react';
import c from './Slider.module.scss';
import clsx from 'clsx';
import { MediaContext } from '@/_app/providers/MediaProvider';
import Skeleton from 'react-loading-skeleton';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Slider: FC<IProps> = ({ className, ...props }) => {
	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.label}>Товари зі знижкою</div>
			{maw767 && (
				<div className={c.image}>
					<Skeleton height={'100%'} />
				</div>
			)}
			<p className={c.name}>
				<Skeleton />
			</p>
			<p className={c.promoDuration}>
				<Skeleton width={'50%'} />
			</p>
			<div className={c.container}>
				<div className={c.productInfo}>
					<Skeleton height={'100%'} />
				</div>
				{!maw767 && (
					<div className={c.image}>
						<Skeleton height={'100%'} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Slider;
