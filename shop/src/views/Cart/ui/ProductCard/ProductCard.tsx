import React, { FC } from 'react';
import c from './ProductCard.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon, ChangeQuantity, Price } from '@/shared/ui/components';
import { getImagePath } from '@/shared/utils';
import { ICartItem } from '@/entities/Cart';

type IProps = ICartItem & {
	className?: string;
	changeCount: (newCount: number) => void;
	removeItem: () => void;
};
const ProductCard: FC<IProps> = ({
	image,
	id,
	name,
	code,
	oldPrice,
	discount,
	price,
	count,
	changeCount,
	removeItem,
	slug,
	className,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)}>
			<div className={c.image}>
				<img src={getImagePath(image)} alt="" loading="lazy" />
				<button className={c.deleteBtn} onClick={removeItem}>
					<Icon name={'close-circle'} />
				</button>
			</div>
			<div className={c.info}>
				<Link className={c.name} href={`/product/${slug}`}>
					{name}
				</Link>
				<p className={c.code}>{code}</p>
			</div>
			<div className={c.quantity}>
				<ChangeQuantity
					value={count}
					decrease={() =>
						count != 1 ? changeCount(count - 1) : undefined
					}
					increase={() => changeCount(count + 1)}
					change={newCount => changeCount(Math.max(newCount, 1))}
				/>
			</div>
			<Price
				className={c.price}
				oldPrice={oldPrice}
				oldPriceClassName={c.oldPrice}
				discount={discount}
				discountClassName={c.discount}
				price={price}
				actualPriceClassName={c.actualPrice}
				align={'right'}
			/>
		</div>
	);
};

export default ProductCard;
