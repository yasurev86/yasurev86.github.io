'use client';

import { FC, AllHTMLAttributes, useState, useCallback, useRef } from 'react';
import c from './Slider.module.scss';
import clsx from 'clsx';
import {
	FreeMode,
	Mousewheel,
	Thumbs,
	Scrollbar,
	Navigation,
} from 'swiper/modules';
import { Swiper as SwiperElement, SwiperSlide } from 'swiper/react';
import { Swiper } from 'swiper';
import { Icon } from '@/shared/ui/components';
import { SwiperRef } from 'swiper/react';
import { IStrapiMedia } from '@/shared/api';
import { getImagePath } from '@/shared/utils';
import ZoomImageElement from './ZoomImageElement/ZoomImageElement';

type IProps = {
	items: IStrapiMedia<true>;
} & AllHTMLAttributes<HTMLDivElement>;
const Slider: FC<IProps> = ({ items, className, ...props }) => {
	const [thumbsSlider, setThumbsSlider] = useState<Swiper>();

	const sliderRef = useRef<SwiperRef>(null);
	const thumbsNavigationRef = useRef<{
		prev: HTMLButtonElement | null;
		next: HTMLButtonElement | null;
	}>({ prev: null, next: null });

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;

		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;

		sliderRef.current.swiper.slideNext();
	}, []);

	if (!items.data) return null;

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<div className={c.slider}>
				{items.data.length > 1 && (
					<div className={c.arrows}>
						<button onClick={handlePrev}>
							<Icon name={'arrow-left'} />
						</button>
						<button onClick={handleNext}>
							<Icon name={'arrow-right'} />
						</button>
					</div>
				)}
				<SwiperElement
					modules={[FreeMode, Mousewheel, Thumbs]}
					freeMode={{
						enabled: true,
						sticky: true,
					}}
					mousewheel={{
						forceToAxis: true,
					}}
					thumbs={{ swiper: thumbsSlider }}
					className={c.slider}
					ref={sliderRef}
				>
					{items.data.map(item => {
						return (
							<SwiperSlide key={item.id} className={c.slide}>
								<ZoomImageElement src={getImagePath(item)} />
							</SwiperSlide>
						);
					})}
				</SwiperElement>
			</div>
			<SwiperElement
				modules={[Thumbs, Scrollbar, Navigation]}
				scrollbar={{
					draggable: true,
					horizontalClass: c.scrollbar,
					dragClass: c.scrollbarDrag,
				}}
				navigation={{
					prevEl: thumbsNavigationRef.current.prev,
					nextEl: thumbsNavigationRef.current.next,
				}}
				watchSlidesProgress
				onSwiper={setThumbsSlider}
				slidesPerView={5}
				spaceBetween={10}
				className={c.thumbSlider}
			>
				{items.data.map(item => (
					<SwiperSlide key={item.id}>
						<div className={c.thumb}>
							<img
								src={getImagePath(item, true).thumbnail}
								alt={''}
							/>
						</div>
					</SwiperSlide>
				))}
				{items.data.length > 5 && (
					<div className={c.thumbsNavigation}>
						<button
							ref={ref => {
								thumbsNavigationRef.current.prev = ref;
							}}
						>
							<Icon name={'arrow-left'} />
						</button>
						<button
							ref={ref => {
								thumbsNavigationRef.current.next = ref;
							}}
						>
							<Icon name={'arrow-right'} />
						</button>
					</div>
				)}
			</SwiperElement>
		</div>
	);
};

export default Slider;
