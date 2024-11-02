import { FC, AllHTMLAttributes } from 'react';
import c from './Category.module.scss';
import clsx from 'clsx';
import Icon, { TIconName } from '@/shared/ui/components/Icon';

type IProps = {
	name: string;
	icon: TIconName;
	isSelected?: boolean;
} & AllHTMLAttributes<HTMLDivElement>;
const Category: FC<IProps> = ({
	name,
	icon,
	isSelected,
	className,
	...props
}) => {
	return (
		<div
			className={clsx(
				c.wrapper,
				isSelected && c['_is-selected'],
				className,
			)}
			{...props}
		>
			<Icon name={icon} className={c.icon} />
			<span className={c.name}>{name}</span>
			<Icon name={'arrow-right'} className={c.arrow} />
		</div>
	);
};

export default Category;
