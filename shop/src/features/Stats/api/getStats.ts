import { fetchApi } from '@/shared/api';
import { IStatBlock } from '../model/IStatBlock';

export const getStats = async (): Promise<IStatBlock[] | undefined> => {
	const response = await fetchApi<{
		blocks: IStatBlock[];
	}>('stats-section', {
		populate: 'blocks',
	});

	if (!response.data) return undefined;

	return response.data.attributes.blocks;
};
