import { FC, AllHTMLAttributes } from 'react';
import c from './Breadcrumbs.module.scss';
import clsx from 'clsx';
import { Icon } from '@/shared/ui/components';
import Link from 'next/link';
import { IBreadcrumbsItem } from '@/shared/ui/components/Breadcrumbs';

type IProps = {
	items: IBreadcrumbsItem[];
} & AllHTMLAttributes<HTMLDivElement>;
const Breadcrumbs: FC<IProps> = ({ items, className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<Link href={'/'} className={c.item}>
				<Icon name={'home'} />
			</Link>
			{items.map(({ link, name }) =>
				link !== undefined ? (
					<Link href={link} className={c.item} key={name}>
						<span>{name}</span>
					</Link>
				) : (
					<span className={c.item} key={name}>
						<span>{name}</span>
					</span>
				),
			)}
		</div>
	);
};

export default Breadcrumbs;
