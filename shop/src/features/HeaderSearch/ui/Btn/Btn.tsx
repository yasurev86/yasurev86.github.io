import React, { FC, useContext, ButtonHTMLAttributes } from 'react';
import c from '../HeaderSearch.module.scss';
import { Icon } from '@/shared/ui/components';
import { MediaContext } from '@/_app/providers/MediaProvider';
import clsx from 'clsx';
import { i18n } from '@/shared/i18n';

type IProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;
const Btn: FC<IProps> = ({ className, ...props }) => {
	const {
		max: { w999: maw999 },
	} = useContext(MediaContext);

	return (
		<button className={clsx(c.btn, className)} {...props}>
			{maw999 ? <Icon name={'search-normal'} /> : i18n('search')}
		</button>
	);
};

export default Btn;
