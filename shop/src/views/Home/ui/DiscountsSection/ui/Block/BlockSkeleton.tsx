import { FC, AllHTMLAttributes } from 'react';
import c from './Block.module.scss';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const BlockSkeleton: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.image}>
				<Skeleton height={'100%'} />
			</div>
			<p className={c.caption} style={{ width: '60%' }}>
				<Skeleton />
			</p>
		</div>
	);
};

export default BlockSkeleton;
