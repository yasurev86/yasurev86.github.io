'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useActions, useAppSelector } from '@/shared/store/hooks';
import { ICartData } from '../model/ICartData';
import { useRouter } from 'next/navigation';
import { IUserInfo } from '../model/IUserInfo';
import { Dispatch, SetStateAction, useState } from 'react';

export const usePayment = (): {
	data: ICartData;
	setData: Dispatch<SetStateAction<ICartData>>;
	newUser: IUserInfo;
	setNewUser: Dispatch<SetStateAction<IUserInfo>>;
	handlePayment: () => Promise<void>;
} => {
	const cartItems = useAppSelector(state => state.CartReducer.items);
	const isLogged = useAppSelector(state => state.UserReducer.isLogged);
	const location = useAppSelector(state => state.LocationReducer);
	const { setUserLogged } = useActions();

	const { push } = useRouter();

	const [data, setData] = useState<ICartData>({
		payment: 'onReceive',
		delivery: 'pickup',
		deliveryAddress: {
			street: '',
			building: '',
			floor: '',
			flat: '',
			hasElevator: false,
		},
		pickupAddress: '',
	});

	const [newUser, setNewUser] = useState<IUserInfo>({
		name: '',
		surname: '',
		email: '',
		phone: '',
	});

	const handlePayment = async () => {
		if (!isLogged) {
			const { name, surname, email, phone } = newUser;

			if (
				email &&
				email.match(
					/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				)
			) {
				const register = axios
					.post(
						process.env.NEXT_PUBLIC_API_URL + 'auth/local/register',
						{
							username: email,
							name,
							surname,
							email,
						},
						{
							withCredentials: true,
						},
					)
					.then(res => {
						if (res.status === 200) {
							setUserLogged(res.data.user.id);
						}
					})
					.catch(e => {
						console.log(e);
					});

				await toast.promise(register, {
					loading: 'Регистрируем пользователя....',
					success: data => `Успешно зарегистрирован!`,
					error: () => `Ошибка регистрации.`,
				});
			}
		}

		const token = Cookies.get('token');

		const perform = axios.post(
			'/strapi/api/orders/perform',
			{
				items: cartItems,
				...data,
				city: location.city,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		const res = await toast.promise(perform, {
			loading: 'Оформление заказа....',
			success: data => `Заказ успешно оформлен!`,
			error: () => `Ошибка оформления.`,
		});

		push(res.data?.link || `/result/${res.data.order_id}`);
	};

	return {
		data,
		setData,
		newUser,
		setNewUser,
		handlePayment,
	};
};
