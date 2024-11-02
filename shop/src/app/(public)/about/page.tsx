import { FC } from 'react';
import AboutUs from '@/views/AboutUs';
import { fetchApi } from '@/shared/api';
import { IAboutUsData } from '@/views/AboutUs/ui/AboutUs';
import { CantGetServerData } from '@/shared/ui/components';

type IProps = {};
const AboutPage: FC<IProps> = async ({ ...props }) => {
	const response = await fetchApi<IAboutUsData>('about-page', {
		populate: ['tags', 'image'],
	});

	if (!response.data) return <CantGetServerData />;

	const data = (({
		caption,
		text,
		tags,
		image,
		advantages_caption,
		caption_2,
		text_2,
	}) => ({
		caption,
		text,
		tags,
		image,
		caption_2,
		text_2,
		advantages_caption,
	}))(response.data.attributes);

	return <AboutUs data={data} />;
};

export default AboutPage;
