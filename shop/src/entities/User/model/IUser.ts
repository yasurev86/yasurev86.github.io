export interface IUser {
	id: number;
	blocked: boolean;
	confirmed: boolean;
	name: string | null;
	surname: string | null;
	patronymic: string | null;
	birthdate: string | null;
	phone?: string | null;
	avatar?: string;
	email: string;
}
