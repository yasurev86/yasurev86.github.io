import { FC } from 'react';
import Favourites from '@/views/profile/Favourites';

export const dynamic = 'force-dynamic'; // defaults to auto

type IProps = {};
const FavouritesPage: FC<IProps> = ({ ...props }) => {
	return <Favourites />;
};

export default FavouritesPage;
