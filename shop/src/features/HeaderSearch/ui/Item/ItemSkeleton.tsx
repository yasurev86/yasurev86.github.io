import { FC, AllHTMLAttributes } from 'react';
import c from './Item.module.scss';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const ItemSkeleton: FC<IProps> = ({ className, ...props }) => {
	return (
		<div
			className={clsx(c.wrapper, c['_is-skeleton'], className)}
			{...props}
		>
			<div className={c.name}>
				<Skeleton />
			</div>
			<div className={c.removeBtn}>
				<Skeleton />
			</div>
		</div>
	);
};

export default ItemSkeleton;
