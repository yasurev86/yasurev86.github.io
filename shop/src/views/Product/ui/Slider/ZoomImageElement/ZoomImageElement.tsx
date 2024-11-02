import { FC, AllHTMLAttributes, useRef, useEffect } from 'react';
import c from './ZoomImageElement.module.scss';
import clsx from 'clsx';

type IProps = { src: string } & AllHTMLAttributes<HTMLDivElement>;
const ZoomImageElement: FC<IProps> = ({ src, className, ...props }) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const isMobile = window.innerWidth < 1024;

		if (isMobile) return;

		const wrapper = wrapperRef.current;

		if (!wrapper) return;

		const handleMouseMove = (e: MouseEvent) => {
			const wrapper = wrapperRef.current;
			const image = imageRef.current;

			if (!wrapper || !image) return;

			const { width, height, left, top } =
				wrapper.getBoundingClientRect();

			const { clientX, clientY } = e;

			const x = (clientX - left) / width;
			const y = (clientY - top) / height;

			image.style.setProperty('--x', (x - 0.5) * -55 + '%');
			image.style.setProperty('--y', (y - 0.5) * -55 + '%');
		};

		const handleMouseEnter = () => {
			const image = imageRef.current;

			if (!image) return;

			image.classList.add(c['image--active']);
		};

		const handleMouseLeave = () => {
			const image = imageRef.current;

			if (!image) return;

			image.classList.remove(c['image--active']);
		};

		wrapper.addEventListener('mouseenter', handleMouseEnter);
		wrapper.addEventListener('mouseleave', handleMouseLeave);
		wrapper.addEventListener('mousemove', handleMouseMove);

		return () => {
			wrapper.removeEventListener('mouseenter', handleMouseEnter);
			wrapper.removeEventListener('mouseleave', handleMouseLeave);
			wrapper.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return (
		<div className={clsx(c.wrapper, className)} ref={wrapperRef} {...props}>
			<div
				className={c.image}
				ref={imageRef}
				style={{
					backgroundImage: `url(${src})`,
				}}
			/>
		</div>
	);
};

export default ZoomImageElement;
