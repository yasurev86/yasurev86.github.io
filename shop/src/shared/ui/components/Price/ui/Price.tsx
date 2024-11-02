import { FC, AllHTMLAttributes } from 'react';
import c from './Price.module.scss';
import clsx from 'clsx';
import ActualPrice from './ActualPrice/ActualPrice';
import Discount from './Discount/Discount';
import OldPrice from './OldPrice/OldPrice';
import { IDiscount } from '@/entities/Product';

type IProps = {
	price: number;
	oldPrice?: number;
	discount?: IDiscount;
	oldPriceClassName?: string;
	discountClassName?: string;
	actualPriceClassName?: string;
	variant?:
		| 'group_oldPrice-and-discount'
		| 'group_actualPrice-and-discount'
		| 'all-in-row';
	align?: 'left' | 'center' | 'right';
} & AllHTMLAttributes<HTMLDivElement>;
const Price: FC<IProps> = ({
	price,
	discount,
	oldPrice,
	oldPriceClassName,
	discountClassName,
	actualPriceClassName,
	className,
	variant = 'group_oldPrice-and-discount',
	align = 'left',
	...props
}) => {
	const haveOldPrice = !!oldPrice;
	const haveDiscount = !!discount;

	return (
		<div
			className={clsx(
				c.wrapper,
				c[`variant--${variant}`],
				c[`align--${align}`],
				className,
			)}
			{...props}
		>
			{variant == 'group_oldPrice-and-discount' && (
				<>
					{haveOldPrice && haveDiscount && (
						<div className={c.discountBlock}>
							<OldPrice
								price={oldPrice}
								className={oldPriceClassName}
							/>
							<Discount
								data={discount}
								className={discountClassName}
							/>
						</div>
					)}
					<ActualPrice
						price={price}
						className={actualPriceClassName}
					/>
				</>
			)}
			{variant == 'group_actualPrice-and-discount' && (
				<>
					{haveOldPrice && (
						<OldPrice
							price={oldPrice}
							className={oldPriceClassName}
						/>
					)}
					<div className={c.actualPlusDiscountBlock}>
						<ActualPrice
							price={price}
							className={actualPriceClassName}
						/>
						{haveDiscount && (
							<Discount
								data={discount}
								className={discountClassName}
							/>
						)}
					</div>
				</>
			)}
			{variant == 'all-in-row' && (
				<>
					<ActualPrice
						price={price}
						className={actualPriceClassName}
					/>
					{haveOldPrice && (
						<OldPrice
							price={oldPrice}
							className={oldPriceClassName}
						/>
					)}
					{haveDiscount && (
						<Discount
							data={discount}
							className={discountClassName}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Price;
