import React, { ComponentProps, FC } from 'react';
import c from './Product.module.scss';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Product from '@/entities/Product';
import { i18n } from '@/shared/i18n';

type IProps = {
	className?: string;
} & Partial<
	Pick<ComponentProps<typeof Product>, 'size' | 'variant' | 'rounded'>
>;

const ProductSkeleton: FC<IProps> = ({
	size = 'default',
	variant = 'default',
	rounded = true,
	className,
	...props
}) => {
	return (
		<div
			className={clsx(
				c.wrapper,
				c[`variant--${variant}`],
				c[`size--${size}`],
				rounded && c['_rounded'],
				className,
			)}
			title={i18n('loading')}
			{...props}
		>
			<div className={c.main}>
				<div className={c.image}>
					<Skeleton height={'100%'} />
				</div>
				<div className={c.color}>
					<div style={{ width: '100%' }}>
						<Skeleton width={'50%'} />
					</div>
				</div>
				<div>
					<p className={c.name}>
						<Skeleton />
					</p>
					<p className={c.code}>
						<Skeleton width={'50%'} />
					</p>
				</div>
			</div>
			<div
				className={c.footer}
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 32px',
						gap: 30,
						height: 32,
						alignItems: 'center',
					}}
				>
					<div>
						<Skeleton width={'50%'} />
						<Skeleton />
					</div>
					<div>
						<Skeleton height={32} />
					</div>
				</div>
				<Skeleton width={'60%'} />
			</div>
		</div>
	);
};

export default ProductSkeleton;
