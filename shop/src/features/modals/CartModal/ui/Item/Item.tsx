import React, { FC } from 'react';
import c from './Item.module.scss';
import clsx from 'clsx';
import { Btn, Icon, ChangeQuantity, Price } from '@/shared/ui/components';
import Link from 'next/link';
import { getImagePath } from '@/shared/utils';
import { ICartItem } from '@/entities/Cart';
import { i18n } from '@/shared/i18n';

type IProps = ICartItem & {
	className?: string;
	changeCount: (newCount: number) => void;
	deleteItem: () => void;
};
const Item: FC<IProps> = ({
	name,
	image,
	code,
	price,
	discount,
	oldPrice,
	changeCount,
	deleteItem,
	className,
	slug,
	count,
}) => {
	return (
		<div className={clsx(c.wrapper, className)}>
			<div className={c.image}>
				<img src={getImagePath(image)} alt="" loading="lazy" />
				<button className={c.mobileDeleteBtn} onClick={deleteItem}>
					<Icon name={'close-circle'} />
				</button>
			</div>
			<div className={c.info}>
				<Link className={c.name} href={`/product/${slug}`}>
					{name}
				</Link>
				<p className={c.code}>{code}</p>
			</div>
			<div className={c.priceAndQuantity}>
				<ChangeQuantity
					value={count}
					decrease={() => {
						if (count !== 1) changeCount(count - 1);
					}}
					increase={() => changeCount(count + 1)}
					change={newCount => changeCount(Math.max(newCount, 1))}
				/>
				<Price
					className={c.price}
					oldPrice={oldPrice ? oldPrice * count : undefined}
					oldPriceClassName={c.oldPrice}
					discount={
						discount
							? discount.type == 'flat'
								? { ...discount, value: discount.value * count }
								: discount
							: undefined
					}
					discountClassName={c.discount}
					price={price * count}
					actualPriceClassName={c.actualPrice}
				/>
			</div>
			<Btn
				use={'tertiary-accent'}
				className={c.deleteBtn}
				size={'medium'}
				onClick={deleteItem}
			>
				{i18n('delete')}
			</Btn>
		</div>
	);
};

export default Item;
