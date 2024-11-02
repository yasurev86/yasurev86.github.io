import { FC, AllHTMLAttributes } from 'react';
import c from './Sidebar.module.scss';
import clsx from 'clsx';
import { Btn, ConditionalLoadingBlock } from '@/shared/ui/components';
import SidebarProductCardSkeleton from '../SidebarProductCard/SidebarProductCardSkeleton';
import SidebarProductCard from '../SidebarProductCard/SidebarProductCard';
import { formatPrice } from '@/shared/utils';
import Skeleton from 'react-loading-skeleton';
import { IProduct } from '@/entities/Product';
import { getImagePath } from '@/shared/utils';
import { ICartItem } from '@/entities/Cart';
import { i18n } from '@/shared/i18n';

type IProps = {
	itemsCount: number;
	items?: IProduct[];
	counts: { [key: number]: number };
	isLoading: boolean;
	initPayment: () => void;
} & AllHTMLAttributes<HTMLDivElement>;
const Sidebar: FC<IProps> = ({
	isLoading,
	items,
	counts,
	itemsCount,
	className,
	initPayment,
	...props
}) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<p className={c.caption}>{i18n('order_composition')}</p>
			<ConditionalLoadingBlock
				isLoading={isLoading}
				isEmpty={!isLoading && items && !items.length}
				data={items}
				fallback={Array.from({ length: itemsCount }).map(() => (
					<SidebarProductCardSkeleton />
				))}
				content={(items: ICartItem[]) =>
					items &&
					items.map(({ id, image, name, code, price, count }) => (
						<SidebarProductCard
							name={name}
							image={getImagePath(image)}
							code={code}
							price={price * counts[id]}
							key={id}
						/>
					))
				}
				emptyResult={<>{i18n('cart_products_not_found')}</>}
			/>
			<hr />
			{/*<p className={c.caption}>Promo</p>*/}
			{/*<div className={c.promo}>*/}
			{/*	<input*/}
			{/*		type={'text'}*/}
			{/*		value={promo}*/}
			{/*		onChange={e => setPromo(e.target.value)}*/}
			{/*		placeholder={'Promo'}*/}
			{/*	/>*/}
			{/*	<button>Apply</button>*/}
			{/*</div>*/}
			{/*<hr />*/}
			{items ? (
				<>
					<div className={c.line}>
						<span>{i18n('n_products_for_sum', items.length)}</span>
						<span>
							{formatPrice(
								items.reduce(
									(acc, cur) =>
										acc +
										(cur.oldPrice ?? cur.price) *
											counts[cur.id],
									0,
								),
							)}{' '}
							{i18n('currency')}
						</span>
					</div>
					<div className={c.line}>
						<span>{i18n('discount')}</span>
						<span className={c.accent}>
							{formatPrice(
								items.reduce(
									(acc, cur) =>
										acc +
										(cur.oldPrice
											? cur.oldPrice - cur.price
											: 0) *
											counts[cur.id],
									0,
								),
							)}{' '}
							{i18n('currency')}
						</span>
					</div>
					<div className={c.line}>
						<span>{i18n('delivery_price')}</span>
						<span className={c.semiOpacity}>
							{i18n('on_carrier_tariffs')}
						</span>
					</div>
					<hr />
					<div className={clsx(c.line, c.total)}>
						<span>{i18n('total')}</span>
						<span>
							{formatPrice(
								items.reduce(
									(acc, cur) =>
										acc + cur.price * counts[cur.id],
									0,
								),
							)}{' '}
							{i18n('currency')}
						</span>
					</div>
				</>
			) : (
				<>
					<div className={c.line}>
						<span>
							<Skeleton />
						</span>
						<span>
							<Skeleton />
						</span>
					</div>
					<div className={c.line}>
						<span>
							<Skeleton />
						</span>
						<span>
							<Skeleton />
						</span>
					</div>
					<div className={c.line}>
						<span>
							<Skeleton />
						</span>
						<span>
							<Skeleton />
						</span>
					</div>
					<hr />
					<div className={clsx(c.line, c.total)}>
						<span>{i18n('total')}</span>
						<span>
							<Skeleton />
						</span>
					</div>
				</>
			)}
			<Btn
				size={'large'}
				fullWidth
				className={c.orderBtn}
				onClick={initPayment}
			>
				{i18n('perform_order')}
			</Btn>
		</div>
	);
};

export default Sidebar;
