'use client';

import { FC, useMemo } from 'react';
import c from './CartModal.module.scss';
import { Modal, Icon, ConditionalLoadingBlock } from '@/shared/ui/components';
import Actions from './Actions/Actions';
import RecommendedProductsSlider from './RecommendedProductsSlider/RecommendedProductsSlider';
import { useGetProductsQuery } from '@/entities/Product';
import { useActions, useAppSelector } from '@/shared/store/hooks';
import toast from 'react-hot-toast';
import { ICartItem } from '@/entities/Cart';
import ItemSkeleton from './Item/ItemSkeleton';
import Item from './Item/Item';
import { selectorCartItems } from '@/shared/store/reducers/Cart';
import { i18n } from '@/shared/i18n';

type IProps = {};
export const cartModalName = 'cart';
const CartModal: FC<IProps> = () => {
	const cartItems = useAppSelector(selectorCartItems);

	const { data: products, isFetching } = useGetProductsQuery(
		{
			ids: cartItems ? Object.keys(cartItems).map(Number) : [],
		},
		{
			skip: !cartItems || Object.keys(cartItems).length == 0,
		},
	);

	const { setCartItemQuantity, removeFromCart } = useActions();
	const categories = useMemo(() => {
		if (!products?.data) return [];

		return Array.from(
			new Set(
				// @ts-ignore
				products?.data.reduce(
					// @ts-ignore
					(acc, { categories }) => [...acc, categories[0]],
					[],
				),
			),
		);
	}, [isFetching]);

	return (
		<Modal
			caption={i18n('cart')}
			name={cartModalName}
			className={c.modalInner}
			fullscreen
		>
			<ConditionalLoadingBlock
				isEmpty={
					!isFetching && cartItems && !Object.keys(cartItems).length
				}
				isLoading={isFetching}
				data={products?.data}
				fallback={(cartItems
					? Object.keys(cartItems)
					: Array.from({ length: 3 })
				).map((_, ind) => (
					<ItemSkeleton key={ind} />
				))}
				content={(products: ICartItem[]) =>
					cartItems &&
					!!Object.keys(cartItems).length && (
						<>
							{products.map((data, ind) => (
								<Item
									{...data}
									changeCount={quantity =>
										setCartItemQuantity({
											id: data.id,
											quantity,
										})
									}
									count={cartItems[data.id]}
									deleteItem={() => {
										removeFromCart(data.id);
										toast.success(i18n('delete_success'));
									}}
									key={data.id}
								/>
							))}
							<Actions
								products={products}
								counts={cartItems}
								className={c.actions}
							/>
						</>
					)
				}
				emptyResult={
					<>
						<div className={c.empty}>
							<Icon name={'bag'} className={c.emptyIcon} />
							<p>{i18n('cart_modal_empty')}</p>
							<span>{i18n('cart_modal_empty_subcaption')}</span>
						</div>
					</>
				}
			/>
			<RecommendedProductsSlider
				className={c.recommendedSlider}
				caption={i18n('recommended_products')}
				categories={categories as number[]}
				exclude={cartItems ? Object.keys(cartItems).map(Number) : []}
			/>
		</Modal>
	);
};

export default CartModal;
