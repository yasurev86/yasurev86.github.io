import { useActions, useAppSelector, useModal } from '@/shared/store/hooks';
import { cartModalName, loginModalName } from '@/features/modals';
import toast from 'react-hot-toast';
import { i18n } from '@/shared/i18n';

export const useCart = (id: number) => {
	const isInCart = useAppSelector(state => !!state.CartReducer.items[id]);
	const { addToCart, removeFromCart, setCartItemQuantity } = useActions();

	const addToCartWithId = addToCart.bind(undefined, id);
	const removeFromCartWithId = () => {
		removeFromCart.bind(undefined, id);
		toast.success(i18n('delete_success'));
	};
	const setCartItemQuantityWithId = (quantity: number) =>
		setCartItemQuantity({ id, quantity });

	const {
		[cartModalName]: { open: openCartModal },
	} = useModal([cartModalName, loginModalName]);

	const toggleCartItem = () => {
		openCartModal();
		if (!isInCart) {
			addToCartWithId();
			toast.success(i18n('delete_success'));
		}
	};

	return {
		isInCart,
		addToCart: addToCartWithId,
		removeFromCart: removeFromCartWithId,
		setCartItemQuantity: setCartItemQuantityWithId,
		toggleCartItem,
	};
};
