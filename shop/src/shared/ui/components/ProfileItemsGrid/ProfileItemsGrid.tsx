'use client';

import { FC, AllHTMLAttributes, ComponentProps } from 'react';
import c from './ProfileItemsGrid.module.scss';
import clsx from 'clsx';
import Product, { IProduct } from '@/entities/Product';

type IProps = {
	products: IProduct[];
	checkboxValue?: (data: IProduct) => boolean;
	checkboxSetValue?: (value: boolean, data: IProduct) => void;
	variant?: ComponentProps<typeof Product>['variant'];
} & AllHTMLAttributes<HTMLDivElement>;
const ProfileItemsGrid: FC<IProps> = ({
	className,
	products,
	checkboxValue,
	checkboxSetValue,
	variant,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{products &&
				products.map(data => (
					<div className={c.item} key={data.id}>
						<Product
							{...data}
							variant={variant}
							checkboxSetValue={value =>
								checkboxSetValue
									? checkboxSetValue(value, data)
									: undefined
							}
							checkboxValue={checkboxValue}
						/>
					</div>
				))}
		</div>
	);
};

export default ProfileItemsGrid;
