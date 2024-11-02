import { fetchApi } from '@/shared/api';
import { IFooterBlock } from '@/shared/ui/layout/Footer/model/IFooterBlock';
import { linkPopulate } from '@/entities/Link';
import { IShared } from '@/entities/Shared';

export const getFooterData = async () => {
	const blocksResponse = await fetchApi<{
		blocks: IFooterBlock[];
	}>('footer', {
		populate: {
			blocks: {
				populate: {
					links: {
						...linkPopulate,
					},
				},
			},
		},
	});

	const sharedResponse = await fetchApi<IShared>('shared', {
		fields: ['email', 'schedule', 'address', 'phone'],
	});

	const blocks = blocksResponse.data?.attributes.blocks;
	const contacts = sharedResponse.data?.attributes;

	return { blocks, contacts };
};
