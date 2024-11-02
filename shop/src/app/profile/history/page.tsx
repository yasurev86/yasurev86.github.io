import { FC } from 'react';
import History from '@/views/profile/History';

export const dynamic = 'force-dynamic'; // defaults to auto

type IProps = {};
const HistoryPage: FC<IProps> = ({ ...props }) => {
	return <History />;
};

export default HistoryPage;
