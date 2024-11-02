import { ILink } from '../model/ILink';
import { ILinkData } from '../model/ILinkData';

export const getLinkData = (link: ILink | null): ILinkData => {
	if (!link)
		return {
			href: '',
			text: '',
			blank: false,
		};

	const {
		text,
		link: href,
		category,
		product,
		prebuild_page,
		text_page,
	} = link;

	return {
		href:
			href ??
			'/' +
				((category.data?.attributes.slug &&
					`catalog/${category.data?.attributes.slug}`) ||
					text_page.data?.attributes.slug ||
					prebuild_page ||
					(product.data?.attributes.slug &&
						`product/${product.data?.attributes.slug}`)),
		text:
			text ??
			(category.data?.attributes.name ||
				text_page.data?.attributes.name ||
				product.data?.attributes.name),
		blank: href?.startsWith('http') ?? false,
	};
};
