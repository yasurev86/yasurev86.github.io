'use client';

import React, { FC, ComponentProps, AllHTMLAttributes } from 'react';
import c from './Product.module.scss';
import clsx from 'clsx';
import { IProduct, Rating } from '@/entities/Product';
import { ColorOption } from '@/shared/ui/components/ColorPicker';
import { Checkbox, Price, Icon } from '@/shared/ui/components';
import { getImagePath } from '@/shared/utils';
import CartBtn from '../ui/CartBtn/CartBtn';
import FavouriteBtn from '../ui/FavouriteBtn/FavouriteBtn';
import ComparisonBtn from '../ui/ComparisonBtn/ComparisonBtn';
import { i18n } from '@/shared/i18n';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

type ICheckboxProps = ComponentProps<typeof Checkbox>;

type IProps = IProduct & {
	className?: string;
	size?: 'default' | 'small';
	variant?: 'default' | 'comparison' | 'favourites';
	checkboxSetValue?: ICheckboxProps['setValue'];
	checkboxValue?: ICheckboxProps['value'];
	onCloseBtnClick?: () => void;
	isLoading?: boolean;
	rounded?: boolean;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'id' | 'color' | 'size'>;

const Product: FC<IProps> = ({
	id,
	slug,
	image,
	name,
	price,
	categories,
	discount,
	oldPrice,
	rating,
	reviews_count,
	code,
	size = 'default',
	variant = 'default',
	colors,
	color,
	slider,
	className,
	checkboxValue,
	checkboxSetValue,
	onCloseBtnClick,
	isLoading,
	availability,
	rounded = true,
	...props
}) => {
	return (
		<div
			className={clsx(
				c.wrapper,
				c[`variant--${variant}`],
				c[`size--${size}`],
				rounded && c['_rounded'],
				className,
			)}
			onMouseEnter={e => {
				props.onMouseEnter && props.onMouseEnter(e);
				(e.target as HTMLElement)
					.closest(`.${c.wrapper}`)
					?.classList.add(c['_hover']);
			}}
			onMouseLeave={e => {
				props.onMouseLeave && props.onMouseLeave(e);
				(e.target as HTMLElement)
					.closest(`.${c.wrapper}`)
					?.classList.remove(c['_hover']);
			}}
			title={name}
		>
			<FullSizeLink href={`/product/${slug}`} />
			<div className={c.main}>
				<div className={c.image}>
					<img
						src={getImagePath(image)}
						loading="lazy"
						alt="product-image"
					/>
					<img
						src={getImagePath(slider ? slider[0] : undefined)}
						loading="lazy"
						alt="product-image"
					/>
				</div>
				<div className={c.actions}>
					{variant == 'comparison' && (
						<button
							className={c.closeBtn}
							onClick={onCloseBtnClick}
						>
							<Icon name={'close-circle'} />
						</button>
					)}
					{variant == 'default' && (
						<>
							<FavouriteBtn product_id={id} />
							<ComparisonBtn
								product_id={id}
								categories={categories as number[]}
							/>
						</>
					)}
					{variant == 'favourites' && (
						<Checkbox
							className={c.checkbox}
							value={checkboxValue}
							setValue={checkboxSetValue}
						/>
					)}
				</div>
				{colors.length !== 0 && (
					<div className={c.color}>
						<p>{i18n('colors')}</p>
						{colors.map(data => (
							<ColorOption
								{...data}
								key={data.id}
								initialChecked={data.id == color}
							/>
						))}
					</div>
				)}
				<div>
					<p className={c.name}>{name}</p>
					<p className={c.code}>{code}</p>
				</div>
			</div>
			<div className={c.footer}>
				<div className={c.buy}>
					<Price
						className={c.price}
						oldPrice={oldPrice}
						oldPriceClassName={c.oldPrice}
						discount={discount}
						discountClassName={c.discount}
						price={price}
						actualPriceClassName={c.actualPrice}
					/>
					<CartBtn
						size={size == 'default' ? 'medium' : 'small'}
						className={c.cartBtn}
						product_id={id}
						isLoading={isLoading}
					/>
				</div>
				<Rating
					rating={rating}
					reviewsCount={reviews_count}
					size={size}
				/>
			</div>
		</div>
	);
};

export default Product;
