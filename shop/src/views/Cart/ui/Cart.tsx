'use client';

import { FC, AllHTMLAttributes } from 'react';
import c from './Cart.module.scss';
import clsx from 'clsx';
import Sidebar from './Sidebar/Sidebar';
import ProductCard from '../ui/ProductCard/ProductCard';
import Option from '../ui/Option/Option';
import LocationBlock from './LocationBlock/LocationBlock';
import ReceiverBlock from '../ui/ReceiverBlock/ReceiverBlock';
import UserBlock from './UserBlock';
import WarehousesSelect from '../ui/WarehousesSelect/WarehousesSelect';
import AddressSelect from '../ui/AddressSelect/AddressSelect';
import { IDeliveryAddress } from '../model/IDeliveryAddress';
import { usePayment } from '../lib/usePayment';
import ProductCardSkeleton from '../ui/ProductCard/ProductCardSkeleton';
import { useGetProductsQuery } from '@/entities/Product';
import { ConditionalLoadingBlock } from '@/shared/ui/components';
import { useActions, useAppSelector } from '@/shared/store/hooks';
import { ICartItem } from '@/entities/Cart';
import { selectorCartItems } from '@/shared/store/reducers/Cart';
import { selectorUserIsLogged } from '@/shared/store/reducers/User';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Cart: FC<IProps> = ({ className, ...props }) => {
	const cartItems = useAppSelector(selectorCartItems);
	const { setCartItemQuantity, removeFromCart, setUserLogged } = useActions();

	const { data: products, isFetching } = useGetProductsQuery(
		{
			ids: cartItems ? Object.keys(cartItems).map(Number) : [],
		},
		{
			skip: !cartItems || Object.keys(cartItems).length == 0,
		},
	);

	const isLogged = useAppSelector(selectorUserIsLogged);

	const { data, setData, newUser, setNewUser, handlePayment } = usePayment();

	return (
		<section className={clsx(c.wrapper, className)} {...props}>
			<h1 className={c.caption}>{i18n('order_performing')}</h1>
			<div className={c.container}>
				<div className={c.main}>
					<h3>{i18n('your_contact_data')}</h3>
					<UserBlock
						className={c.userInfo}
						newUser={newUser}
						setNewUser={setNewUser}
					/>
					<LocationBlock />
					<div className={c.products}>
						<ConditionalLoadingBlock
							isLoading={isFetching}
							isEmpty={
								!isFetching &&
								cartItems &&
								!Object.keys(cartItems).length
							}
							data={products?.data}
							fallback={(cartItems
								? Object.keys(cartItems)
								: Array.from({ length: 3 })
							).map(() => (
								<ProductCardSkeleton />
							))}
							content={(products: ICartItem[]) =>
								cartItems &&
								products.map(data => (
									<ProductCard
										{...data}
										count={cartItems[data.id]}
										changeCount={quantity =>
											setCartItemQuantity({
												id: data.id,
												quantity,
											})
										}
										removeItem={() =>
											removeFromCart(data.id)
										}
									/>
								))
							}
							emptyResult={<>{i18n('cart_products_not_found')}</>}
						/>
					</div>
					<hr className={c.divider} />
					<h3>{i18n('delivery')}</h3>
					<Option
						name={i18n('mail_pickup')}
						price={0}
						isActive={data.delivery == 'pickup'}
						onSelect={() => {
							setData(cur => ({ ...cur, delivery: 'pickup' }));
						}}
					>
						<WarehousesSelect
							data={data.pickupAddress}
							setData={pickupAddress =>
								setData(cur => ({ ...cur, pickupAddress }))
							}
						/>
					</Option>
					<Option
						name={i18n('courier')}
						price={300}
						isActive={data.delivery == 'delivery'}
						onSelect={() => {
							setData(cur => ({
								...cur,
								delivery: 'delivery',
							}));
						}}
					>
						<AddressSelect
							data={data.deliveryAddress}
							setData={(
								deliveryAddress: (
									cur: IDeliveryAddress,
								) => IDeliveryAddress,
							) =>
								setData(cur => ({
									...cur,
									deliveryAddress: deliveryAddress(
										cur.deliveryAddress,
									),
								}))
							}
						/>
					</Option>
					<hr className={c.divider} />
					<h3>{i18n('payment')}</h3>
					<Option
						name={i18n('pickup_payment')}
						description={i18n(
							'service_paid_separately_carrier_tariffs',
						)}
						isActive={data.payment == 'onReceive'}
						onSelect={() =>
							setData(cur => ({ ...cur, payment: 'onReceive' }))
						}
					/>
					<Option
						name={i18n('pay_immediately')}
						description={'Lorem ipsum'}
						isActive={data.payment == 'online'}
						onSelect={() =>
							setData(cur => ({ ...cur, payment: 'online' }))
						}
					/>
					<hr className={c.divider} />
					<h3>{i18n('receiver')}</h3>
					<ReceiverBlock
						value={data?.receiver}
						isDefaultOpened={!isLogged}
						handleChange={(field: string, value: string) =>
							setData(cur => ({
								...cur,
								receiver: { ...cur?.receiver, [field]: value },
							}))
						}
					/>
				</div>
				<div className={c.sidebarContainer}>
					<Sidebar
						className={c.sidebar}
						itemsCount={
							cartItems ? Object.keys(cartItems).length : 3
						}
						items={products?.data || []}
						counts={cartItems}
						isLoading={isFetching}
						initPayment={handlePayment}
					/>
				</div>
			</div>
		</section>
	);
};

export default Cart;
