'use client';

import {
	AllHTMLAttributes,
	ChangeEvent,
	CSSProperties,
	Dispatch,
	FC,
	SetStateAction,
	useState,
} from 'react';
import c from './Input.module.scss';
import clsx from 'clsx';
import Icon, { TIconName } from '@/shared/ui/components/Icon';
import { useToggle } from '@/shared/hooks';
import InputMask from 'react-input-mask';

type TypeAction = {
	text: string;
	onClick: () => void;
};

type IProps = (
	| { label?: string; placeholder?: never }
	| { label?: never; placeholder?: string }
) & {
	value?: string;
	setValue?: Dispatch<SetStateAction<any>>;

	isTextarea?: boolean;

	icon?: TIconName;
	iconPos?: 'left' | 'right';

	isShowHide?: boolean;
	initialHidden?: boolean;

	action?: TypeAction;

	maxLength?: number;

	search?: boolean;

	mask?: string;

	validationError?: string;
	error?: string;
	isLoading?: boolean;
	isSuccess?: boolean;

	onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

	// Для демонстрации
	state?: 'default' | 'hover' | 'active' | 'focus';
	onFocus?: () => void;
} & Pick<
		AllHTMLAttributes<HTMLTextAreaElement>,
		'disabled' | 'className' | 'rows'
	>;
const Input: FC<IProps> = ({
	className,
	isTextarea,
	label,
	icon,
	iconPos,
	isShowHide,
	initialHidden,
	action,
	maxLength,
	search,
	disabled,
	validationError,
	error,
	isLoading,
	isSuccess,
	onChange,
	state,
	value,
	setValue,
	mask,
	...props
}) => {
	const [internalValue, setInternalValue] = useState('');
	const { isActive: contentHidden, toggle: toggleContentHidden } =
		useToggle(isShowHide);

	const classNames = [
		c.wrapper,
		[
			label && 'label',
			icon && 'icon',
			search && 'search',
			isShowHide && 'showHide',
		].map(feature => c[`feature--${feature}`]),
		c[`type--${isTextarea ? 'textarea' : 'input'}`],
		disabled && c['wrapper--disabled'],
		className,
	];

	const handleChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
	) => {
		const targetValue = e.target.value;
		if (!maxLength || targetValue.length <= maxLength) {
			(setValue ?? setInternalValue)(e.target.value);
		}
		if (onChange) {
			if (isTextarea) onChange(e as ChangeEvent<HTMLTextAreaElement>);
			else onChange(e as ChangeEvent<HTMLInputElement>);
		}
	};

	const elementProps = {
		className: clsx(
			c.element,
			c[`state--${state}`],
			!!validationError && c['element--validationError'],
			!!error && c['element--error'],
			(isLoading || isSuccess) && c['state--hover'],
		),
		required: true,
		type: !isTextarea ? (contentHidden ? 'password' : 'text') : undefined,
		value: value ?? internalValue,
		onChange: handleChange,
		disabled,
		style: isTextarea
			? ({ '--rows': props.rows ?? 1 } as CSSProperties)
			: {},
		...props,
	};

	const footerNeeded =
		(action && action.text) ||
		maxLength ||
		!!validationError ||
		!!error ||
		isLoading ||
		isSuccess;

	return (
		<div className={clsx(...classNames)}>
			<div className={c.inner}>
				{search && (
					<Icon name={'search-normal'} className={c.searchIcon} />
				)}
				{isTextarea ? (
					<textarea {...elementProps} />
				) : mask ? (
					<InputMask mask={mask} {...elementProps} />
				) : (
					<input {...elementProps} />
				)}
				{label && <span className={c.label}>{label}</span>}
				{icon && <Icon name={icon} className={c.icon} />}
				{isShowHide && (
					<button
						type={'button'}
						className={c.showHideBtn}
						onClick={toggleContentHidden}
					>
						<Icon name={contentHidden ? 'eye' : 'eye-slash'} />
					</button>
				)}
			</div>
			{footerNeeded && (
				<div className={c.footer}>
					<span
						className={clsx(
							c.status,
							!!validationError && c['status--validationError'],
							!!error && c['status--error'],
							isLoading && c['status--isLoading'],
							isSuccess && c['status--isSuccess'],
						)}
					>
						{!!validationError && (
							<>
								<Icon
									name={'warning'}
									className={c.statusIcon}
								/>
								{validationError}
							</>
						)}
						{!!error && (
							<>
								<Icon
									name={'close-circle'}
									className={c.statusIcon}
								/>
								{error}
							</>
						)}
						{isLoading && <>Loading</>}
						{isSuccess && <>Success</>}
					</span>
					{action && action.text && (
						<span className={c.action} onClick={action.onClick}>
							{action.text}
						</span>
					)}
					{maxLength && (
						<span className={c.maxLength}>
							{(value ?? internalValue).length}/{maxLength}
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default Input;
