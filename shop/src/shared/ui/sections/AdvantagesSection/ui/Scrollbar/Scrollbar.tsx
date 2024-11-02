'use client';

import { Scrollbar as SmoothScrollbar } from 'smooth-scrollbar-react';
import { FC, ComponentProps } from 'react';

const Scrollbar: FC<ComponentProps<typeof SmoothScrollbar>> = ({
	children,
	...props
}) => {
	return (
		<SmoothScrollbar {...props}>
			<div>{children}</div>
		</SmoothScrollbar>
	);
};

export default Scrollbar;
