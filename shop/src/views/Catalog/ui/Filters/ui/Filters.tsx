'use client';

import { FC, AllHTMLAttributes, useRef } from 'react';
import c from './Filters.module.scss';
import clsx from 'clsx';
import Accordion from '@/views/Catalog/ui/Accordion/Accordion';
import CheckboxWithCount from './CheckboxWithCount/CheckboxWithCount';
import RangeBlock from './RangeBlock/RangeBlock';
import CategoryItem from './CategoryItem/CategoryItem';
import { IColor } from '@/entities/Product';
import { useDebounce, useToggle } from '@/shared/hooks';
import { ICategory } from '@/entities/Category';
import {
	ColorPicker,
	Btn,
	Icon,
	StyledSimpleBar,
} from '@/shared/ui/components';
import { convertFormData } from '../lib/convertFormData';
import { IFilter } from '../model/IFilter';
import { i18n } from '@/shared/i18n';

type IProps = {
	isOpened: boolean;
	disable: () => void;
	items: IFilter[];
	categories: ICategory[];
	setFilters: (filters: object) => void;
} & AllHTMLAttributes<HTMLDivElement>;
const Filters: FC<IProps> = ({
	setFilters,
	categories,
	items,
	isOpened,
	disable,
	className,
	...props
}) => {
	const { isActive: resetFlicker, toggle: toggleResetFlicker } = useToggle();

	const formRef = useRef<HTMLFormElement>(null);
	const resetFilters = () => {
		const form = formRef.current;

		if (!form) return;

		form.reset();
		toggleResetFlicker();
	};

	const formSubmit = () => {
		const form = formRef.current;
		if (!form) return;

		const formData = new FormData(form);

		const transformedData = convertFormData(formData);
		setFilters(transformedData);
	};

	const debouncedFormSubmit = useDebounce(() => {
		formSubmit();
	}, 2000);

	return (
		<div
			className={clsx(c.wrapper, isOpened && c['_is-opened'], className)}
			{...props}
		>
			<form
				className={c.inner}
				ref={formRef}
				onSubmit={e => e.preventDefault()}
			>
				<div className={c.header}>
					<div className={c.caption}>
						{i18n('filters')} <span>10</span>
					</div>
					<button
						type={'button'}
						className={c.closeBtn}
						onClick={disable}
					>
						<Icon name={'close-circle'} />
					</button>
				</div>
				<div className={c.scrollContainer}>
					<StyledSimpleBar className={c.simplebar}>
						<div className={c.scrollInner}>
							{categories && !!categories.length && (
								<Accordion header={i18n('categories')}>
									{categories.map(({ id, ...data }) => (
										<CategoryItem key={id} {...data} />
									))}
								</Accordion>
							)}
							{items &&
								items.map(
									({ id, name, type, values, range }) => (
										<Accordion
											header={name}
											key={id}
											isInitialOpened={
												[
													'price',
													'color',
													'producer',
													'availability',
												].indexOf(id) !== -1
											}
										>
											{type == 'boolean' && (
												<>
													<CheckboxWithCount
														setValue={
															debouncedFormSubmit
														}
														name={`${id}.boolean`}
														inputValue={'0'}
														count={
															values
																? (
																		values[0] as {
																			count: number;
																		}
																	).count || 0
																: 0
														}
													>
														{i18n('no')}
													</CheckboxWithCount>
													<CheckboxWithCount
														setValue={
															debouncedFormSubmit
														}
														name={`${id}.boolean`}
														inputValue={'1'}
														count={
															values
																? (
																		values[1] as {
																			count: number;
																		}
																	).count || 0
																: 0
														}
													>
														{i18n('yes')}
													</CheckboxWithCount>
												</>
											)}
											{type == 'predefined' && (
												<>
													{values &&
														Object.entries(
															values,
														).map(
															([
																optionId,
																{ name, count },
															]) => (
																<CheckboxWithCount
																	name={id}
																	inputValue={
																		optionId
																	}
																	count={
																		count ||
																		0
																	}
																	key={
																		optionId
																	}
																	setValue={
																		debouncedFormSubmit
																	}
																>
																	{name}
																</CheckboxWithCount>
															),
														)}
												</>
											)}
											{type == 'range' && (
												<RangeBlock
													onChange={
														debouncedFormSubmit
													}
													min={range[0]}
													max={range[1]}
													name={id}
													resetFlicker={resetFlicker}
												/>
											)}
											{type == 'color' && (
												<ColorPicker
													onChange={
														debouncedFormSubmit
													}
													name={id}
													colors={values as IColor[]}
													isFirstInitialChecked={
														false
													}
												/>
											)}
										</Accordion>
									),
								)}
						</div>
					</StyledSimpleBar>
				</div>
				<div className={c.btns}>
					<Btn
						onClick={() => {
							formSubmit();
							disable();
						}}
						className={c.applyBtn}
					>
						{i18n('apply')}
					</Btn>
					<Btn use={'secondary'} onClick={resetFilters}>
						{i18n('reset')}
					</Btn>
				</div>
			</form>
			<div className={c.overlay} onClick={disable} />
		</div>
	);
};

export default Filters;
