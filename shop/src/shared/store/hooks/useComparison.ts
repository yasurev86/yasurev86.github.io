import { useActions, useAppSelector } from '@/shared/store/hooks';
import toast from 'react-hot-toast';

export const useComparison = (id: number, categories: number[]) => {
	const isInComparison = useAppSelector(state =>
		Object.values(state.ComparisonReducer.items).reduce(
			(acc, cur) => acc || (cur || []).indexOf(id) !== -1,
			false,
		),
	);
	const { addToComparison, removeFromComparison } = useActions();

	const toggleComparison = () => {
		if (isInComparison) {
			removeFromComparison(id);
			toast.success('Успешно удалено.');
		} else {
			addToComparison({ id, categories });
			toast.success('Успешно удалено.');
		}
	};

	const addToComparisonWithId = addToComparison.bind(undefined, {
		id,
		categories,
	});
	const removeFromComparisonWithId = removeFromComparison.bind(undefined, id);

	return {
		isInComparison,
		toggleComparison,
		addToComparison: addToComparisonWithId,
		removeFromComparison: removeFromComparisonWithId,
	};
};
