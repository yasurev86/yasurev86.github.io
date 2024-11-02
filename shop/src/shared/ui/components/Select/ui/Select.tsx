'use client';

import React, {
	FC,
	AllHTMLAttributes,
	useState,
	ChangeEvent,
	useEffect,
} from 'react';
import c from './Select.module.scss';
import clsx from 'clsx';
import { useToggle } from '@/shared/hooks';
import { StyledSimpleBar, InViewTrigger, Icon } from '@/shared/ui/components';
import { TItems } from '../model/TItems';
import { i18n } from '@/shared/i18n';

type IProps = {
	items: TItems;

	value?: string;
	onChange?: (key: string) => void;

	placeholder?: string;
	label?: string;

	isInput?: boolean;
	inputValue?: string;
	onInputChange?: (value: string) => void;

	disabled?: boolean;
	isLoading?: boolean;
	isInViewTriggerActive?: boolean;
	inViewTriggerCallback?: (isInView: boolean) => void;

	onInit?: (controls: { enable: () => void; disable: () => void }) => void;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'onChange'>;

const Select: FC<IProps> = ({
	className,
	items,
	value,
	isInput,
	placeholder,

	inputValue,
	onInputChange,

	label,
	onChange,
	disabled = false,

	isLoading = false,
	isInViewTriggerActive = false,
	inViewTriggerCallback,

	onInit,
	...props
}) => {
	const isItemsArray = Array.isArray(items);

	const { isActive, toggle, enable, disable } = useToggle(false);

	const [internalSelected, setInternalSelected] = useState('');
	const [internalInputValue, setInternalInputValue] = useState(
		value ? (isItemsArray ? value : items[value]) : '',
	);

	const selected = value != undefined ? value : internalSelected;
	const inputFinalValue =
		inputValue != null ? inputValue : internalInputValue;

	const selectOption = (key: string) => {
		onChange ? onChange(key) : setInternalSelected(key);
		onInputChange
			? onInputChange(isItemsArray ? key : items[key])
			: setInternalInputValue(isItemsArray ? key : items[key]);
		disable();
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		onInputChange ? onInputChange(value) : setInternalInputValue(value);
	};

	useEffect(() => {
		onInit && onInit({ enable, disable });
	}, []);

	return (
		<div
			className={clsx(
				c.wrapper,
				disabled && c['_is-disabled'],
				c[`variant--${isInput ? 'input' : 'default'}`],
				className,
			)}
			{...props}
		>
			<div
				className={c.selected}
				onClick={isInput ? undefined : toggle}
				onKeyDown={e => {
					if (e.key === 'Enter' && !isInput) {
						toggle();
					}
				}}
				tabIndex={disabled || isInput ? -1 : 0}
			>
				<div className={c.selectedInner}>
					{isInput ? (
						<input
							type={'text'}
							value={inputFinalValue}
							placeholder={placeholder ?? i18n('choose')}
							onChange={handleInputChange}
						/>
					) : selected ? (
						isItemsArray ? (
							selected
						) : (
							items[selected]
						)
					) : (
						placeholder ?? i18n('choose')
					)}
				</div>
				<button
					className={c.arrow}
					onClick={isInput ? toggle : undefined}
					tabIndex={!disabled && isInput ? 0 : -1}
					aria-label={i18n('open_dropdown_list')}
				>
					<Icon name={isActive ? 'arrow-down' : 'arrow-up'} />
				</button>
			</div>
			{items && Object.keys(items).length > 0 && isActive && (
				<div className={c.items}>
					<StyledSimpleBar className={c.scrollContainer}>
						{isItemsArray
							? items.map(value => (
									<button
										className={clsx(
											c.item,
											selected == value &&
												c['item--selected'],
										)}
										onClick={() => selectOption(value)}
										key={value}
									>
										<span>{value}</span>
									</button>
								))
							: Object.entries(items).map(([key, value]) => (
									<button
										className={clsx(
											c.item,
											selected == key &&
												c['item--selected'],
										)}
										onClick={() => selectOption(key)}
										key={key}
									>
										<span>{value}</span>
									</button>
								))}
						{isInViewTriggerActive && (
							<InViewTrigger
								onChange={inView =>
									inViewTriggerCallback &&
									inViewTriggerCallback(inView)
								}
							/>
						)}
						{isLoading && <>{i18n('loading')}</>}
					</StyledSimpleBar>
				</div>
			)}
		</div>
	);
};

export default Select;
