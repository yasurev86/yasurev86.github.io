import { useMemo } from 'react';

export const useFreezeScroll = (): {
	freezeScroll: () => void;
	unfreezeScroll: () => void;
	toggleScroll: (flag?: boolean) => void;
} => {
	const [freezeScroll, unfreezeScroll, toggleScroll] = useMemo(() => {
		if (typeof window == 'undefined') return [() => {}, () => {}, () => {}];

		const body = document.body;

		const freezeFn = () => {
			body.style.overflow = 'hidden';
		};

		const unfreezeFn = () => {
			body.style.overflow = 'visible';
		};

		const toggleFn = (flag?: boolean) => {
			if (typeof flag !== 'undefined') flag ? freezeFn() : unfreezeFn();
			else body.style.overflow == 'hidden' ? unfreezeFn() : freezeFn();
		};

		return [freezeFn, unfreezeFn, toggleFn];
	}, []);

	return { freezeScroll, unfreezeScroll, toggleScroll };
};
