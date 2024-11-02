import { useActions } from '@/shared/store/hooks/useActions';

type ModalControls = {
	open: (data?: any) => void;
	toggle: () => void;
};

type CloseControl = {
	close: () => void;
};

export function useModal<T extends string>(
	names: T[],
): Record<T, ModalControls> & CloseControl;

export function useModal<T extends string>(
	name: T,
): ModalControls & CloseControl;

export function useModal<T extends string>(
	nameOrNames: T[] | T,
): Record<T, ModalControls> | ModalControls {
	const { openModal, closeModal, toggleModal } = useActions();

	if (Array.isArray(nameOrNames)) {
		return Object.fromEntries([
			...nameOrNames.map(name => [
				name,
				{
					open: (data?: any) =>
						// @ts-ignore
						openModal({
							name,
							data:
								typeof data == 'object' && 'nativeEvent' in data
									? undefined
									: data,
						}),
					// @ts-ignore
					toggle: toggleModal.bind(undefined, name),
				},
			]),
			['close', closeModal],
		]);
	}

	return {
		open: (data?: any) =>
			// @ts-ignore
			openModal({
				name: nameOrNames,
				data:
					typeof data == 'object' && 'nativeEvent' in data
						? undefined
						: data,
			}),
		// @ts-ignore
		toggle: toggleModal.bind(undefined, nameOrNames),
		// @ts-ignore
		close: closeModal,
	};
}
