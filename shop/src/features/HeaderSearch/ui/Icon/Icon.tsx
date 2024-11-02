import React, { FC, useContext, ComponentProps } from 'react';
import c from '../HeaderSearch.module.scss';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { Icon } from '@/shared/ui/components';
import clsx from 'clsx';

type IProps = Omit<ComponentProps<typeof Icon>, 'name'>;
const HeaderSearchIcon: FC<IProps> = ({ className, ...props }) => {
	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);

	if (maw767) return null;

	return (
		<Icon
			name={'search-normal'}
			className={clsx(c.icon, className)}
			{...props}
		/>
	);
};

export default HeaderSearchIcon;
