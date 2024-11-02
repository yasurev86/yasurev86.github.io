import { AllHTMLAttributes, ComponentProps, FC, useContext } from 'react';
import c from './ActionBtns.module.scss';
import clsx from 'clsx';
import { EAvailability } from '@/entities/Product';
import { Btn, Icon } from '@/shared/ui/components';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { useComparison, useCart, useModal } from '@/shared/store/hooks';
import { useFavourite } from '@/entities/Favourite';
import {
	useAddProductNotificationMutation,
	useGetNotificationIdQuery,
	useRemoveProductNotificationMutation,
} from '@/entities/ProductNotification';
import { loginModalName } from '@/features/modals';
import { i18n } from '@/shared/i18n';

type IProps = {
	id: number;
	categories: number[];
	availability: EAvailability;
	cartBtnLast?: boolean;
	small?: boolean;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'id'>;
const ActionBtns: FC<IProps> = ({
	id,
	cartBtnLast = false,
	availability,
	small = false,
	categories,
	className,
	...props
}) => {
	const { isLogged, isFavourite, toggleFavourite, addFavourite } =
		useFavourite(id);

	const { isInComparison, toggleComparison } = useComparison(id, categories);

	const { isInCart, toggleCartItem } = useCart(id);

	const {
		max: { w767: maw767, w427: maw427 },
	} = useContext(MediaContext);

	const { data: notificationId } = useGetNotificationIdQuery(id, {
		skip: !isLogged,
	});
	const [addNotification] = useAddProductNotificationMutation();
	const [removeNotification] = useRemoveProductNotificationMutation();

	const { open: openLoginModal } = useModal(loginModalName);

	const toggleNotification = () => {
		if (isLogged) {
			if (!!notificationId) {
				removeNotification(notificationId);
			} else {
				addNotification(id);
				addFavourite();
			}
		} else {
			openLoginModal();
		}
	};

	const btnSize: ComponentProps<typeof Btn>['size'] = (() => {
		if (small) {
			if (maw427) return 'small';
			return 'medium';
		}
		if (maw767) return 'medium';
		return 'large';
	})();

	return (
		<div
			className={clsx(
				c.wrapper,
				cartBtnLast && c['_cart-btn-last'],
				small && c['_small'],
				className,
			)}
			{...props}
		>
			{availability == EAvailability.discountinued ? (
				<>
					<Btn
						icon={'bag'}
						className={c.cartBtn}
						size={btnSize}
						use={'secondary'}
						link={'https://google.com'}
						target={'_blank'}
					>
						{i18n('new_models_of_company', 'BOSCH')}
					</Btn>
				</>
			) : (
				<>
					{availability == EAvailability.inStock ? (
						<Btn
							icon={isInCart ? 'bag-checked' : 'bag'}
							className={c.cartBtn}
							size={btnSize}
							onClick={toggleCartItem}
						>
							{isInCart
								? i18n('cart_btn_added')
								: i18n('cart_btn_buy')}
						</Btn>
					) : (
						<Btn
							className={c.cartBtn}
							size={btnSize}
							onClick={toggleNotification}
							use={'secondary'}
						>
							{!!notificationId
								? i18n('not_notify')
								: i18n('notify')}
						</Btn>
					)}
					<button
						className={clsx(
							c.favouriteBtn,
							isFavourite && c['favouriteBtn--active'],
						)}
						onClick={toggleFavourite}
					>
						<Icon name={isFavourite ? 'heart-filled' : 'heart'} />
					</button>
					<button
						className={clsx(c.comparisonBtn)}
						onClick={toggleComparison}
					>
						<Icon name={'balance'} />
						{isInComparison && (
							<span className={c.comparisonBtn_checked}>
								<span>
									<Icon name={'checkbox'} />
								</span>
							</span>
						)}
					</button>
				</>
			)}
		</div>
	);
};

export default ActionBtns;
