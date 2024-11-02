'use client';

import {
	FC,
	AllHTMLAttributes,
	useRef,
	useCallback,
	useState,
	useEffect,
} from 'react';
import c from './RecommendedProductsSlider.module.scss';
import clsx from 'clsx';
import { Btn } from '@/shared/ui/components';
import Product, {
	useGetProductsQuery,
	ProductSkeleton,
} from '@/entities/Product';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode, Mousewheel } from 'swiper/modules';

type IProps = {
	caption: string;
	categories: number[];
	exclude?: number[];
} & AllHTMLAttributes<HTMLDivElement>;

const RecommendedProductsSlider: FC<IProps> = ({
	caption,
	categories,
	className,
	exclude = [],
	...props
}) => {
	const { data: products, isLoading } = useGetProductsQuery({
		limit: 15,
		categories,
		exclude,
	});

	useEffect(() => {
		if (!isLoading) {
			sliderRef.current?.swiper?.enable();
		}
	}, [isLoading]);

	const sliderRef = useRef<SwiperRef>(null);

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;

		sliderRef.current.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;

		sliderRef.current.swiper.slideNext();
	}, []);

	const [canSlide, setCanSlide] = useState({ prev: false, next: true });
	const onSlideChange = useCallback(
		(swiper: { isBeginning: boolean; isEnd: boolean }) => {
			setCanSlide({
				prev: !swiper.isBeginning,
				next: !swiper.isEnd,
			});
		},
		[],
	);

	if (products?.data.length == 0) return null;

	return (
		<section className={clsx(c.wrapper, className)} {...props}>
			<div className={c.header}>
				{caption && <h3 className={c.caption}>{caption}</h3>}
				{products?.data && products?.data.length > 3 && (
					<div className={c.nav}>
						<div className={c.arrows}>
							<Btn
								disabled={!canSlide.prev}
								icon={'arrow-left'}
								size={'small'}
								onClick={handlePrev}
								use={'secondary'}
							/>
							<Btn
								disabled={!canSlide.next}
								icon={'arrow-right'}
								size={'small'}
								onClick={handleNext}
								use={'secondary'}
							/>
						</div>
					</div>
				)}
			</div>
			<Swiper
				enabled={!isLoading}
				modules={[FreeMode, Mousewheel]}
				ref={sliderRef}
				onSlideChange={onSlideChange}
				freeMode={{
					enabled: true,
					sticky: true,
				}}
				mousewheel={{
					forceToAxis: true,
				}}
				breakpoints={{
					1600: { slidesPerView: 3 },
				}}
				slidesPerView={2}
				spaceBetween={4}
				className={
					products?.data && products?.data.length > 3
						? c.slider
						: undefined
				}
			>
				{isLoading
					? Array.from({ length: 6 }).map((_, ind) => (
							<SwiperSlide
								key={`loading${ind}`}
								className={c.slide}
							>
								<ProductSkeleton size={'small'} />
							</SwiperSlide>
						))
					: products?.data &&
						products?.data.length &&
						products?.data.map(data => (
							<SwiperSlide key={data.id} className={c.slide}>
								<Product
									{...data}
									className={c.product}
									size={'small'}
								/>
							</SwiperSlide>
						))}
			</Swiper>
		</section>
	);
};

export default RecommendedProductsSlider;
