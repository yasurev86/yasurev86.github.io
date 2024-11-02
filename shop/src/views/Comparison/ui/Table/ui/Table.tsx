'use client';

import {
	FC,
	AllHTMLAttributes,
	useMemo,
	useRef,
	useEffect,
	useContext,
} from 'react';
import c from './Table.module.scss';
import clsx from 'clsx';
import Product from '@/entities/Product';
import ProductSkeleton from '@/entities/Product/ui/ProductSkeleton';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { useActions } from '@/shared/store/hooks';
import { StyledSimpleBar } from '@/shared/ui/components';
import { IDetailedProduct } from '../../../model/IDetailedProduct';
import { i18n } from '@/shared/i18n';
import { IProperties } from '../../../model/IProperties';
import { getPropertiesWithDiff } from '@/views/Comparison/ui/Table/lib/getPropertiesWithDiff';

type IProps = {
	onlyDiff?: boolean;
	count: number;
	products: IDetailedProduct[];
	properties: IProperties;
} & AllHTMLAttributes<HTMLDivElement>;
const Table: FC<IProps> = ({
	count,
	products,
	onlyDiff = true,
	className,
	properties,
	...props
}) => {
	const { removeFromComparison } = useActions();

	const propertiesWithDiff = useMemo(
		() => getPropertiesWithDiff(properties, products),
		[products, onlyDiff],
	);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (wrapperRef.current)
			wrapperRef.current.style.setProperty(
				'--scrollbar-width',
				`${window.innerWidth - document.body.offsetWidth}px`,
			);

		if (window.innerWidth > 999) {
			document.addEventListener('scroll', () => {
				if (!scrollRef.current || !headerRef.current) return;

				const rect = scrollRef.current.getBoundingClientRect();

				const offset = Math.min(
					Math.max(-1 * rect.top, 0),
					rect.height - window.innerHeight,
				);

				headerRef.current.style.transform = `translate3d(0, max(calc(${offset}px - var(--image-part-height)), 0px), 0)`;
			});
		}
	}, []);

	const {
		max: { w999: maw999 },
	} = useContext(MediaContext);

	return (
		<div className={clsx(c.wrapper, className)} {...props} ref={wrapperRef}>
			<div className={c.properties}>
				<ProductSkeleton className={c.emptyProduct} />
				{Object.entries(onlyDiff ? propertiesWithDiff : properties).map(
					([key, { name }]) => (
						<div className={c.cell} key={key}>
							{name}
						</div>
					),
				)}
			</div>
			<StyledSimpleBar
				className={c.scroll}
				scrollableNodeProps={{ ref: scrollRef }}
				autoHide={false}
			>
				<div className={c.header} ref={headerRef}>
					{products.map(data => (
						<div className={c.item} key={data.id}>
							<Product
								{...data}
								rounded={false}
								variant={'comparison'}
								onCloseBtnClick={() =>
									removeFromComparison(data.id)
								}
							/>
						</div>
					))}
				</div>
				{Object.entries(onlyDiff ? propertiesWithDiff : properties).map(
					([key, { name, type }]) => (
						<div className={c.row}>
							{maw999 && (
								<div className={c.categoryName}>{name}</div>
							)}
							{products.map(({ name, properties }) => (
								<div className={c.cell}>
									{maw999 && (
										<p className={c.productName}>{name}</p>
									)}
									{type == 'boolean'
										? properties[key]
											? i18n('yes')
											: i18n('no')
										: properties[key] ?? '-'}
								</div>
							))}
						</div>
					),
				)}
			</StyledSimpleBar>
		</div>
	);
};

export default Table;
