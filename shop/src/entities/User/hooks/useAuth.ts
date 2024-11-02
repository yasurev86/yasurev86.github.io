'use client';

import { useActions } from '@/shared/store/hooks';
import {
	ComponentProps,
	Dispatch,
	FormEvent,
	SetStateAction,
	useCallback,
	useState,
} from 'react';
import { Input } from '@/shared/ui/components';

export const useAuth = <T extends { [key: string]: string | boolean }>(
	fields: T,
	handler: (
		e: FormEvent,
		data: T,
		setErrors: Dispatch<
			SetStateAction<{
				[key in keyof T]: string;
			}>
		>,
		setValidationErrors: Dispatch<
			SetStateAction<{
				[key in keyof T]: string;
			}>
		>,
		setUserLogged: (id: number) => void,
	) => Promise<void>,
) => {
	type TErrors = { [key in keyof T]: string };

	const { setUserLogged } = useActions();

	const initialErrorsState: TErrors = Object.keys(fields).reduce(
		(acc, key) => {
			acc[key as keyof T] = '';
			return acc;
		},
		{} as TErrors,
	);

	const [errors, setErrors] = useState<TErrors>(initialErrorsState);

	const [validationErrors, setValidationErrors] =
		useState<TErrors>(initialErrorsState);

	const [data, setData] = useState<T>(fields);

	const handlerWithData = async (e: FormEvent) =>
		await handler(e, data, setErrors, setValidationErrors, setUserLogged);

	const changeInputValue = useCallback(
		(inputName: keyof typeof data, value: string) => {
			if (inputName in errors)
				setErrors(cur => ({ ...cur, [inputName]: '' }));
			if (inputName in validationErrors)
				setValidationErrors(cur => ({ ...cur, [inputName]: '' }));
			setData(cur => ({ ...cur, [inputName]: value }));
		},
		[],
	);

	const inputProps = <K extends keyof T>(
		inputName: K,
	): Pick<
		ComponentProps<typeof Input>,
		'setValue' | 'validationError' | 'error'
	> & { value: T[K] } => ({
		value: data[inputName],
		setValue: (value: string) => changeInputValue(inputName, value),
		validationError:
			inputName in validationErrors
				? validationErrors[inputName as keyof typeof validationErrors]
				: undefined,
		error:
			inputName in validationErrors
				? errors[inputName as keyof typeof errors]
				: undefined,
	});

	return {
		handler: handlerWithData,
		inputProps,
		data,
		setData,
	};
};
