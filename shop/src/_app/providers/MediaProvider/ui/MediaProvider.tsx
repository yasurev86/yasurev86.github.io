'use client';

import { createContext, FC, PropsWithChildren } from 'react';
import { useMediaQuery } from '@/shared/hooks';
import { TMediaContext } from '../model/TMediaContext';

export const MediaContext = createContext<TMediaContext>({
	max: {},
	min: {},
});

const MediaProvider: FC<PropsWithChildren> = ({ children }) => {
	const MediaContextValue: TMediaContext = {
		max: {
			// w1600: useMediaQuery('(max-width: 1600px)'),
			w1400: useMediaQuery('(max-width: 1400px)'),
			w999: useMediaQuery('(max-width: 999px)'),
			w767: useMediaQuery('(max-width: 767px)'),
			w427: useMediaQuery('(max-width: 427px)'),
		},
		min: {},
	};

	return (
		<MediaContext.Provider value={MediaContextValue}>
			{children}
		</MediaContext.Provider>
	);
};

export default MediaProvider;
