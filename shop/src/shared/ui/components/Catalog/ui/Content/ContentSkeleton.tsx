import { FC, AllHTMLAttributes } from 'react';
import c from '../Catalog.module.scss';
import clsx from 'clsx';
import CategorySkeleton from '../../ui/Category/CategorySkeleton';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const CatalogContentSkeleton: FC<IProps> = ({
	children,
	className,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)}>
			<div className={c.categories}>
				{Array.from({ length: 10 }).map((_, ind) => (
					<CategorySkeleton key={ind} />
				))}
			</div>
			<div className={c.filler}>{children}</div>
		</div>
	);
};

export default CatalogContentSkeleton;
