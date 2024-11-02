'use client';

import React, {
	FC,
	AllHTMLAttributes,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from 'react';
import c from '../HeaderSearch.module.scss';
import clsx from 'clsx';
import { useDebounce } from '@/shared/hooks';
import { useActions } from '@/shared/store/hooks';
import { i18n } from '@/shared/i18n';

type IProps = {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
	onChange?: () => void;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'onChange'>;
const Input: FC<IProps> = ({
	query,
	onChange,
	setQuery,
	className,
	...props
}) => {
	const [innerQuery, setInnerQuery] = useState('');

	const debouncedSetDebouncedQuery = useDebounce((query: string) => {
		onChange && onChange();
		setQuery(query);
	}, 500);

	useEffect(() => {
		debouncedSetDebouncedQuery(innerQuery);
	}, [innerQuery]);

	useEffect(() => {
		setInnerQuery(query);
	}, [query]);

	const { openSearch } = useActions();

	return (
		<input
			placeholder={i18n('i_am_searching')}
			className={clsx(c.input, className)}
			value={innerQuery}
			onChange={e => setInnerQuery(e.target.value)}
			onFocus={openSearch}
			{...props}
		/>
	);
};

export default Input;
