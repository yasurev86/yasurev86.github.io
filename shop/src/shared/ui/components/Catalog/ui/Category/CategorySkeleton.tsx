import { FC, AllHTMLAttributes } from 'react';
import c from './Category.module.scss';
import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';
import { Icon } from '@/shared/ui/components';

type IProps = AllHTMLAttributes<HTMLDivElement>;
const CategorySkeleton: FC<IProps> = ({ name, className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, c['_skeleton'], className)} {...props}>
			<div className={c.icon} style={{ width: '1em' }}>
				<Skeleton />
			</div>
			<span className={c.name}>
				<Skeleton />
			</span>
			<Icon name={'arrow-right'} className={c.arrow} />
		</div>
	);
};

export default CategorySkeleton;
