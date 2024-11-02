import { FC, AllHTMLAttributes } from 'react';
import c from './Block.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { CatalogSectionBaseCategory } from '@/entities/CatalogSection';

type IProps = {
	caption: CatalogSectionBaseCategory;
	products: { id: number; name: string; slug: string }[];
	onLinkClick?: () => void;
} & AllHTMLAttributes<HTMLDivElement>;
const Block: FC<IProps> = ({
	caption,
	products,
	className,
	onLinkClick,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<Link
				className={c.category}
				href={`/catalog/${caption.slug}`}
				onClick={onLinkClick}
			>
				{caption.name}
			</Link>
			{products.map(({ id, name, slug }) => (
				<Link
					href={`/product/${slug}`}
					className={c.item}
					key={id}
					onClick={onLinkClick}
				>
					{name}
					{/* TODO: Add NEW state */}
					{/*{isNew && <span className={c.new}>NEW</span>}*/}
				</Link>
			))}
		</div>
	);
};

export default Block;
