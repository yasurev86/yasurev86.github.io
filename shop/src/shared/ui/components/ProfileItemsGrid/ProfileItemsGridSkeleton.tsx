'use client';

import { FC, AllHTMLAttributes, ComponentProps } from 'react';
import c from './ProfileItemsGrid.module.scss';
import clsx from 'clsx';
import { ProfileItemsGrid } from '@/shared/ui/components';
import { ProductSkeleton } from '@/entities/Product';

type IProps = Pick<ComponentProps<typeof ProfileItemsGrid>, 'variant'> &
	AllHTMLAttributes<HTMLDivElement> & { count: number };
const ProfileItemsGridSkeleton: FC<IProps> = ({
	className,
	count,
	variant,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{Array.from({ length: count }).map((_, ind) => (
				<div className={c.item} key={ind}>
					<ProductSkeleton variant={variant} />
				</div>
			))}
		</div>
	);
};

export default ProfileItemsGridSkeleton;
