import { FC, AllHTMLAttributes } from 'react';
import c from './Section1.module.scss';
import clsx from 'clsx';
import { Breadcrumbs } from '@/shared/ui/components';
import { IAboutUsData } from '@/views/AboutUs/ui/AboutUs';
import { i18n } from '@/shared/i18n';

type IProps = {
	data: Pick<IAboutUsData, 'caption' | 'text' | 'tags'>;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'data'>;
const Section1: FC<IProps> = ({
	data: { caption, text, tags },
	className,
	...props
}) => {
	return (
		<section className={clsx(c.wrapper, className)} {...props}>
			<div className={c.main}>
				<Breadcrumbs
					items={[{ link: '/about', name: i18n('about_us') }]}
				/>
				<div>
					{tags && (
						<div className={c.tags}>
							{tags.map(({ name }) => (
								<span>{name}</span>
							))}
						</div>
					)}
					<h1 className={c.caption}>{caption}</h1>
				</div>
			</div>
			<div className={c.aside}>
				<div className={c.aside_inner}>
					{text.split(/\n/g).map(el => (
						<p>{el}</p>
					))}
				</div>
				<div className={c.partners}>
					<img src="/assets/images/partners/bosch.png" alt="" />
					<img src="/assets/images/partners/teka.png" alt="" />
					<img src="/assets/images/partners/franke.png" alt="" />
					<img src="/assets/images/partners/fabiano.png" alt="" />
				</div>
			</div>
		</section>
	);
};

export default Section1;
