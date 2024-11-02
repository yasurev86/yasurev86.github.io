import { IUser } from '@/entities/User';

export const getFullNameString = (data: IUser | undefined): string => {
	if (!data) return '-';

	const { name, surname, patronymic } = data;

	if (!name && !surname && !patronymic) return '-';

	return [name, surname, patronymic].join(' ');
};
