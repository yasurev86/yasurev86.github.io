import { FC } from 'react';
import c from './ProductCard.module.scss';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type IProps = { className?: string };
const ProductCardSkeleton: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)}>
			<div className={c.image}>
				<Skeleton height={'100%'} />
			</div>
			<div className={c.info}>
				<div className={c.name}>
					<Skeleton width={'50%'} />
				</div>
				<div className={c.code}>
					<Skeleton width={'30%'} />
				</div>
			</div>
			<div className={c.quantity}>
				<Skeleton width={110} height={37} />
			</div>
			<div className={c.price}>
				<Skeleton count={2} />
			</div>
		</div>
	);
};

export default ProductCardSkeleton;
