import React, { FC, RefObject, useEffect, useRef } from 'react';
import c from './FloatingPanel.module.scss';
import clsx from 'clsx';
import { IProduct } from '@/entities/Product';
import ActionBtns from '../ActionBtns/ActionBtns';
import { Price } from '@/shared/ui/components';
import { getImagePath } from '@/shared/utils';

type IProps = IProduct & {
	className?: string;
	trigger?: RefObject<HTMLDivElement>;
	id: number;
};
const FloatingPanel: FC<IProps> = ({
	trigger,
	image,
	name,
	price,
	oldPrice,
	discount,
	availability,
	id,
	className,
	categories,
	...props
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!trigger?.current || !wrapperRef?.current) return;

			const rect = trigger.current.getBoundingClientRect();

			wrapperRef?.current.classList.toggle(
				c['_is-active'],
				rect.top + rect.height < 0,
			);
		};

		document.addEventListener('scroll', handleScroll);

		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	});

	return (
		<div className={clsx(c.wrapper, className)} ref={wrapperRef}>
			<div className={c.info}>
				<img src={getImagePath(image)} alt="" loading="lazy" />
				<p>{name}</p>
			</div>
			<Price
				className={c.price}
				oldPrice={oldPrice}
				oldPriceClassName={c.oldPrice}
				discount={discount}
				discountClassName={c.discount}
				price={price}
				actualPriceClassName={c.actualPrice}
			/>
			<ActionBtns
				availability={availability}
				id={id}
				cartBtnLast
				small
				categories={categories as number[]}
			/>
		</div>
	);
};

export default FloatingPanel;
