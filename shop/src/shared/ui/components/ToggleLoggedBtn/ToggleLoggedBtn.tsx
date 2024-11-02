'use client';

import { FC, ComponentProps } from 'react';
import { useActions, useAppSelector } from '@/shared/store/hooks';
import { Btn } from '@/shared/ui/components';
import { selectorUserIsLogged } from '@/shared/store/reducers/User';

const ToggleLoggedBtn: FC<ComponentProps<typeof Btn>> = ({
	className,
	...props
}) => {
	const { toggleUserLogged } = useActions();
	const isLogged = useAppSelector(selectorUserIsLogged);
	return (
		<Btn onClick={() => toggleUserLogged()} use={'tertiary'} {...props}>
			{isLogged ? 'set unlogged' : 'set logged'}
		</Btn>
	);
};

export default ToggleLoggedBtn;
