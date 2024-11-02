import { FC } from 'react';
import Reviews from '@/views/profile/Reviews';

export const dynamic = 'force-dynamic'; // defaults to auto

type IProps = {};
const ReviewsPage: FC<IProps> = ({ ...props }) => {
	return <Reviews />;
};

export default ReviewsPage;
