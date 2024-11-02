import { FC } from 'react';
import Settings from '@/views/profile/Settings';

export const dynamic = 'force-dynamic'; // defaults to auto

type IProps = {};
const SettingsPage: FC<IProps> = ({ ...props }) => {
	return <Settings />;
};

export default SettingsPage;
