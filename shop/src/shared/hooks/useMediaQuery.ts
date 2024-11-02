import { useState, useCallback, useEffect } from 'react';
export const useMediaQuery = (query: string) => {
	const [targetReached, setTargetReached] = useState(false);

	const updateTarget = useCallback(
		(e: MediaQueryListEvent) => setTargetReached(e.matches),
		[],
	);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const media = window.matchMedia(query);
			media.addEventListener('change', updateTarget);

			if (media.matches) {
				setTargetReached(true);
			}

			return () => media.removeEventListener('change', updateTarget);
		}
	}, []);

	return targetReached;
};
