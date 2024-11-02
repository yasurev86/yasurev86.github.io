import { fetchApi } from '@/shared/api';

export const getTextCollapseSectionData = async (
	id: number,
): Promise<{
	caption: string;
	content: string;
} | null> => {
	const response = await fetchApi<{
		caption: string;
		content: string;
	}>(`text-collapse-sections/${id}`, {});

	if (!response.data) return null;

	const { caption, content } = response.data.attributes;

	return {
		caption,
		content,
	};
};
