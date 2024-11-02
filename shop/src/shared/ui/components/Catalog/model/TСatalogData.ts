import { TIconName } from '@/shared/ui/components/Icon';

export type TCatalogBlockItem = {
	name: string;
	link: string;
	isNew?: boolean;
};

export type TCatalogBlock = {
	caption: Omit<TCatalogBlockItem, 'isNew'>;
	items: TCatalogBlockItem[];
};

export type TCatalogData = {
	[key: string]: {
		icon: TIconName;
		name: string;
		blocks: TCatalogBlock[];
		banner?: string;
	};
};
