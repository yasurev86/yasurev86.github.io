import { FC, AllHTMLAttributes } from 'react';
import c from './AboutUs.module.scss';
import { AdvantagesSection } from '@/shared/ui/sections';
import Section1 from '@/views/AboutUs/ui/Section1/Section1';
import Stats from '@/features/Stats';
import { IStrapiMedia } from '@/shared/api';
import { getImagePath } from '@/shared/utils';

export interface IAboutUsData {
	caption: string;
	text: string;
	tags: { name: string }[];
	advantages_caption: string;
	image: IStrapiMedia;
	caption_2: string;
	text_2: string;
}

type IProps = { data: IAboutUsData } & Omit<
	AllHTMLAttributes<HTMLDivElement>,
	'data'
>;
const AboutUs: FC<IProps> = ({
	data: { caption, text, tags, advantages_caption, image, caption_2, text_2 },
	className,
	...props
}) => {
	return (
		<>
			<Section1 data={{ caption, text, tags }} />
			<section>
				<h3 className={c.caption}>{advantages_caption}</h3>
				<AdvantagesSection className={c.advantages} />
			</section>
			<section>
				<div className={c.captionContainer}>
					<h3 className={c.caption}>{caption_2}</h3>
					<p>{text_2}</p>
				</div>
				<img
					className={c.image}
					src={getImagePath(image.data)}
					alt=""
					loading="lazy"
				/>
			</section>
			<Stats style={{ marginTop: 70 }} />
		</>
	);
};

export default AboutUs;
