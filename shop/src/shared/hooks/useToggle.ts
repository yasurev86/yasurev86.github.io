import { useCallback, useState, MouseEvent } from 'react';

export const useToggle = (defaultState = false) => {
	const [isActive, setIsActive] = useState<boolean>(defaultState);

	const toggle = useCallback(
		(newValue?: boolean | MouseEvent) =>
			setIsActive(cur =>
				newValue && typeof newValue === 'boolean' ? newValue : !cur,
			),
		[setIsActive],
	);
	const disable = useCallback(() => setIsActive(false), [setIsActive]);
	const enable = useCallback(() => setIsActive(true), [setIsActive]);

	return { isActive, toggle, disable, enable };
};
