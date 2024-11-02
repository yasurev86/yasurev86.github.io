import { FC } from 'react';
import c from './Item.module.scss';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';

type IProps = { className?: string };
const ItemSkeleton: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)}>
			<div className={c.image}>
				<Skeleton height={'100%'} />
			</div>
			<div className={c.info}>
				<div className={c.name} style={{ width: '100%' }}>
					<Skeleton />
				</div>
				<div className={c.code}>
					<Skeleton width={'50%'} />
				</div>
			</div>
			<div className={c.priceAndQuantity}>
				<Skeleton width={100} height={37} />
				<div className={c.price}>
					<Skeleton height={37} width={100} />
				</div>
			</div>
			<div className={c.deleteBtn}>
				<Skeleton width={100} height={37} />
			</div>
		</div>
	);
};

export default ItemSkeleton;
