import React, { FC, AllHTMLAttributes } from 'react';
import c from './Items.module.scss';
import clsx from 'clsx';
import { Price } from '@/shared/ui/components';
import { getImagePath } from '@/shared/utils';
import { IOrderItem } from '@/entities/Order';
import { i18n } from '@/shared/i18n';

type IProps = { items: IOrderItem[] } & AllHTMLAttributes<HTMLDivElement>;
const Items: FC<IProps> = ({ items, className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<p className={c.caption}>{i18n('your_order')}</p>
			{items &&
				items.map(({ image, name, code, sum }) => (
					<div className={c.item}>
						<div className={c.image}>
							<img
								src={getImagePath(image)}
								alt=""
								loading="lazy"
							/>
						</div>
						<div className={c.info}>
							<p className={c.name}>{name}</p>
							<p className={c.code}>{code}</p>
						</div>
						<Price
							price={sum}
							actualPriceClassName={c.actualPrice}
						/>
					</div>
				))}
		</div>
	);
};

export default Items;
