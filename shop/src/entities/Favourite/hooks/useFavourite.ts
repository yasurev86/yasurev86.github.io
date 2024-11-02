import { useAppSelector, useModal } from '@/shared/store/hooks';
import {
	useAddFavouriteMutation,
	useGetFavouritesQuery,
	useRemoveFavouriteMutation,
} from '@/entities/Favourite';
import { loginModalName } from '@/features/modals';
import toast from 'react-hot-toast';
import { i18n } from '@/shared/i18n';

export function useFavourite(id: number): {
	isLogged: boolean;
	isFavourite: boolean;
	addFavourite: () => void;
	addResult: any;
	removeResult: any;
	removeFavourite: () => void;
	toggleFavourite: () => void;
};

export function useFavourite(): {
	isLogged: boolean;
	isFavourite: undefined;
	addFavourite: (id: number) => void;
	addResult: any;
	removeResult: any;
	removeFavourite: (id: number) => void;
	toggleFavourite: (id: number) => void;
};

export function useFavourite(id?: number) {
	const isLogged = useAppSelector(state => state.UserReducer.isLogged);

	const { data: favourites } = useGetFavouritesQuery(undefined, {
		skip: !isLogged,
	});
	const isFavourite = id ? favourites && !!favourites[id] : undefined;
	const [addFavourite, addResult] = useAddFavouriteMutation();
	const [removeFavourite, removeResult] = useRemoveFavouriteMutation();

	const { open: openLoginModal } = useModal(loginModalName);

	let addFavouriteFn, removeFavouriteFn, toggleFavouriteFn;

	const add = async (id: number) =>
		await toast.promise(
			new Promise(async (resolve, reject) => {
				await addFavourite(id).then(res => {
					if ('error' in res) reject(res.error);
					resolve(res);
				});
			}),
			{
				loading: i18n('adding_to_favourites'),
				success: () => i18n('add_success'),
				error: () => i18n('add_error'),
			},
		);

	const remove = async (id: number) =>
		favourites &&
		(await toast.promise(
			new Promise(async (resolve, reject) => {
				await removeFavourite(favourites[id]).then(res => {
					if ('error' in res) reject(res.error);
					resolve(res);
				});
			}),
			{
				loading: i18n('deleting_from_favourites'),
				success: () => i18n('delete_success'),
				error: () => i18n('delete_error'),
			},
		));

	const toggle = async (id: number) => {
		if (isLogged && favourites) {
			if (isFavourite) await remove(id);
			else await add(id);
		} else {
			openLoginModal();
		}
	};

	if (id) {
		addFavouriteFn = async () => add(id);
		removeFavouriteFn = async () => remove(id);
		toggleFavouriteFn = async () => {
			await toggle(id);
		};
	} else {
		addFavouriteFn = async (id: number) => await add(id);
		removeFavouriteFn = async (id: number) => await remove(id);
		toggleFavouriteFn = async (id: number) => {
			await toggle(id);
		};
	}

	return {
		isLogged,
		isFavourite,
		addFavourite: addFavouriteFn,
		removeFavourite: removeFavouriteFn,
		toggleFavourite: toggleFavouriteFn,
		addResult,
		removeResult,
	};
}
