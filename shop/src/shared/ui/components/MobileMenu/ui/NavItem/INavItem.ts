import { TIconName } from '@/shared/ui/components/Icon';

export interface INavItem {
	name: string;
	icon: TIconName;
	count?: number;
	link?: string;
	isLoggedOnly?: boolean;
}
