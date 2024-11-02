'use client';

import { FC, AllHTMLAttributes, useRef, useCallback, useContext } from 'react';
import c from './Slider.module.scss';
import clsx from 'clsx';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Icon } from '@/shared/ui/components';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { IStrapiMedia } from '@/shared/api';
import { getImagePath } from '@/shared/utils';
import { ILinkData } from '@/entities/Link';
import FullSizeLink from '@/shared/ui/components/FullSizeLink';

export interface ILeadSectionSlide {
	desktop_image: IStrapiMedia;
	tablet_image: IStrapiMedia;
	mobile_image: IStrapiMedia;
	link: ILinkData;
}

type IProps = {
	items: ILeadSectionSlide[];
} & AllHTMLAttributes<HTMLDivElement>;
const Slider: FC<IProps> = ({ items, className, ...props }) => {
	const sliderRef = useRef<SwiperRef>(null);

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;

		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;

		sliderRef.current.swiper.slideNext();
	}, []);

	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{!maw767 && (
				<div className={c.arrows}>
					<button onClick={handlePrev}>
						<Icon name={'arrow-left'} />
					</button>
					<button onClick={handleNext}>
						<Icon name={'arrow-right'} />
					</button>
				</div>
			)}
			<Swiper
				modules={[Pagination]}
				ref={sliderRef}
				pagination={{ clickable: true, el: `.${c['pagination']}` }}
				className={c.swiper}
			>
				{items &&
					items.map(
						(
							{ desktop_image, tablet_image, mobile_image, link },
							ind,
						) => (
							<SwiperSlide key={ind} className={c.slide}>
								<FullSizeLink
									href={link.href}
									target={link.blank ? '_blank' : undefined}
								/>
								<picture>
									<source
										media={'(min-width: 768px)'}
										srcSet={getImagePath(
											desktop_image.data,
										)}
									/>
									<source
										media={
											'(min-width: 428px) and (max-width: 767px)'
										}
										srcSet={getImagePath(tablet_image.data)}
									/>
									<source
										media={'(max-width: 427px)'}
										srcSet={getImagePath(mobile_image.data)}
									/>
									<img
										src={getImagePath(desktop_image.data)}
										alt=""
										loading="lazy"
									/>
								</picture>
							</SwiperSlide>
						),
					)}

				<div className={c.pagination}></div>
			</Swiper>
		</div>
	);
};

export default Slider;
