import { FC, AllHTMLAttributes } from 'react';
import c from './SidebarProductCard.module.scss';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type IProps = AllHTMLAttributes<HTMLDivElement>;
const SidebarProductCardSkeleton: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.image}>
				<Skeleton height={'100%'} />
			</div>
			<div>
				<p className={c.name}>
					<Skeleton />
				</p>
				<p className={c.code}>
					<Skeleton />
				</p>
			</div>
			<div className={c.price}>
				<Skeleton />
			</div>
		</div>
	);
};

export default SidebarProductCardSkeleton;
