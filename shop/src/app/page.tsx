import Home from '@/views/Home';
import { fetchApi, IStrapiPopulate } from '@/shared/api';
import { linkPopulate } from '@/entities/Link';
import { IProducer } from '@/entities/Producer';
import { ILink } from '@/entities/Link';
import { ILeadSectionSlide } from '@/views/Home/ui/LeadSection/ui/Slider/Slider';
import { CantGetServerData } from '@/shared/ui/components';

export const dynamic = 'force-dynamic'; // defaults to auto

export interface IHomePageComponents {
	blocks: ({ id: number } & (
		| {
				__component: 'home.lead-section';
				slider: (Omit<ILeadSectionSlide, 'link'> & { link: ILink })[];
				producers: IStrapiPopulate<IProducer, true>;
		  }
		| {
				__component: 'home.discounts-section';
				product_variants: IStrapiPopulate<{}, true>;
				categories: IStrapiPopulate<{}, true>;
		  }
		| {
				__component: 'shared.products-slider-section';
				caption: string;
				link: ILink | null;
				product_variants: IStrapiPopulate<{}, true>;
		  }
		| {
				__component: 'shared.text-collapse-section';
				caption: string | null;
				content: string;
		  }
	))[];
}

export default async function HomePage() {
	const res = await fetchApi<IHomePageComponents>('home-page', {
		populate: {
			blocks: {
				on: {
					'home.lead-section': {
						populate: {
							slider: {
								populate: {
									desktop_image: true,
									tablet_image: true,
									mobile_image: true,
									link: linkPopulate,
								},
							},
							producers: {
								fields: ['slug'],
								populate: ['logo'],
							},
						},
					},
					'home.discounts-section': {
						populate: {
							product_variants: {
								fields: ['id'],
							},
							categories: {
								fields: ['id'],
							},
						},
					},
					'shared.products-slider-section': {
						populate: {
							link: {
								populate: [
									'category',
									'product_variant',
									'text_page',
								],
							},
							product_variants: {
								fields: ['id'],
							},
						},
					},
					'shared.text-collapse-section': {
						fields: ['caption', 'content'],
					},
				},
			},
		},
	});

	if (!res.data) return <CantGetServerData />;

	const blocks = res.data.attributes.blocks;

	return <Home blocks={blocks} />;
}
