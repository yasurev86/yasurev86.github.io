'use client';

import { FC, AllHTMLAttributes } from 'react';
import c from './Settings.module.scss';
import clsx from 'clsx';
import AvatarBlock from '@/views/(profile)/Settings/ui/AvatarBlock/AvatarBlock';
import BaseInfoSection from '@/views/(profile)/Settings/ui/BaseInfoSection/BaseInfoSection';
import AddressesSection from '@/views/(profile)/Settings/ui/AddressesSection/AddressesSection';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const Settings: FC<IProps> = ({ className, ...props }) => {
	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<AvatarBlock className={c.avatarBlock} />
			<BaseInfoSection />
			<hr className={c.divider} />
			<AddressesSection />
		</div>
	);
};

export default Settings;
