'use client';

import {
	FC,
	AllHTMLAttributes,
	useRef,
	useCallback,
	useContext,
	useState,
	useEffect,
} from 'react';
import c from './ProductsSection.module.scss';
import clsx from 'clsx';
import { Btn } from '@/shared/ui/components';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MediaContext } from '@/_app/providers/MediaProvider';
import { FreeMode, Mousewheel } from 'swiper/modules';
import Product, {
	ProductSkeleton,
	useGetProductsQuery,
} from '@/entities/Product';
import { ILinkData } from '@/entities/Link';
import { i18n } from '@/shared/i18n';

type IProps = {
	caption?: string;
	link?: ILinkData;
	ids: number[];
	big?: boolean;
} & AllHTMLAttributes<HTMLDivElement>;

const ProductsSection: FC<IProps> = ({
	caption,
	link,
	className,
	big = false,
	ids,
	...props
}) => {
	const {
		data: products,
		error,
		isLoading,
	} = useGetProductsQuery({
		ids,
	});

	useEffect(() => {
		if (!isLoading) {
			sliderRef.current?.swiper.enable();
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

	const {
		max: { w767: maw767 },
	} = useContext(MediaContext);

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
	return (
		<section className={clsx(c.wrapper, className)} {...props}>
			<div className={c.header}>
				{caption && <h3 className={c.caption}>{caption}</h3>}
				<div className={c.nav}>
					{link && (
						<Btn
							use={'tertiary'}
							link={link.href}
							className={c.showMore}
						>
							{link.text}
						</Btn>
					)}
					<div className={c.arrows}>
						<Btn
							disabled={!canSlide.prev}
							icon={'arrow-left'}
							size={maw767 ? 'small' : 'normal'}
							onClick={handlePrev}
						/>
						<Btn
							disabled={!canSlide.next}
							icon={'arrow-right'}
							size={maw767 ? 'small' : 'normal'}
							onClick={handleNext}
						/>
					</div>
				</div>
			</div>
			<Swiper
				enabled={!isLoading}
				breakpoints={{
					768: { slidesPerView: 3, spaceBetween: 12 },
					1000: { slidesPerView: 4, spaceBetween: 12 },
					1400: { slidesPerView: 5, spaceBetween: 11 },
					1600: { slidesPerView: big ? 6 : 5, spaceBetween: 11 },
				}}
				slidesPerView={2}
				spaceBetween={4}
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
			>
				{isLoading ? (
					Array.from({ length: big ? 6 : 5 }).map((_, ind) => (
						<SwiperSlide key={`loading${ind}`}>
							<ProductSkeleton />
						</SwiperSlide>
					))
				) : products?.data && products?.data.length ? (
					products?.data.map(data => (
						<SwiperSlide key={data.id}>
							<Product {...data} />
						</SwiperSlide>
					))
				) : (
					<>{i18n('recently_products_not_found')}</>
				)}
			</Swiper>
		</section>
	);
};

export default ProductsSection;
