import { ICategory } from '@/entities/Category';
import { IStrapiMedia } from '@/shared/api';

export interface CatalogSectionBaseCategory
	extends Pick<ICategory, 'slug' | 'name'> {}
export interface CatalogSectionBaseCategoryWithIcon
	extends Pick<ICategory, 'id' | 'slug' | 'name' | 'icon'> {}

interface ICatalogSectionBanner {
	link: string;
	image: IStrapiMedia;
}

interface ICatalogSectionBlock {
	id: number;
	caption_category: CatalogSectionBaseCategory;
	products: { id: number; name: string; slug: string }[];
}

interface ICatalogSectionPart {
	id: number;
	category: CatalogSectionBaseCategoryWithIcon;
	banner?: ICatalogSectionBanner;
	blocks: ICatalogSectionBlock[];
}

export type ICatalogSection = ICatalogSectionPart[];
