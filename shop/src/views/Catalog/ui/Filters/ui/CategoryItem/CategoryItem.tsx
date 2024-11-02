import { FC, AllHTMLAttributes } from 'react';
import c from './CategoryItem.module.scss';
import clsx from 'clsx';
import { ICategory } from '@/entities/Category';
import { Icon } from '@/shared/ui/components';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type IProps = Pick<ICategory, 'slug' | 'name' | 'icon'> &
	AllHTMLAttributes<HTMLDivElement>;
const CategoryItem: FC<IProps> = ({
	slug,
	name,
	icon,
	className,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<FullSizeLink href={`/catalog/${slug}`} />
			<div className={c.icon}>
				<Icon name={icon} />
			</div>
			<span className={c.name}>{name}</span>
			<span className={c.arrow}>
				<Icon name={'arrow-right'} />
			</span>
		</div>
	);
};

export default CategoryItem;
