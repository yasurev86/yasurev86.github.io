'use client';

import { FC, useEffect, ReactNode, useRef } from 'react';
import c from './Modal.module.scss';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import Icon, { TIconName } from '@/shared/ui/components/Icon';
import { useActions, useAppSelector } from '@/shared/store/hooks';
import { Scrollbar } from 'smooth-scrollbar-react';
import { useFreezeScroll } from '@/shared/hooks';
import { useToggle } from '@/shared/hooks';
import { selectorModalsActiveModal } from '@/shared/store/reducers/Modals';

type IProps = {
	caption: string;
	subcaption?: string;
	subcaptionIcon?: TIconName;
	fullscreen?: boolean; // Mobile fullscreen variant
	initialOpened?: boolean;
	name: string; // Unique modal name for Modals redux state
	className?: string;
	children?: ReactNode;
	openCallback?: () => void;
	closeCallback?: () => void;
};
const Modal: FC<IProps> = ({
	name,
	caption,
	subcaption,
	subcaptionIcon,
	initialOpened = false,
	fullscreen,
	openCallback,
	closeCallback,
	className,
	children,
	...props
}) => {
	const activeModal = useAppSelector(selectorModalsActiveModal);
	const isOpened = activeModal == name;

	const {
		isActive: display,
		enable: enableDisplay,
		disable: disableDisplay,
	} = useToggle();

	const { closeModal } = useActions();

	// TODO: Разобраться почему в onClick нельзя прокинуть просто closeModal
	const close = () => closeModal();

	const { toggleScroll } = useFreezeScroll();

	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpened) openCallback && openCallback();
		else closeCallback && closeCallback();

		toggleScroll(!!activeModal);

		if (isOpened) enableDisplay();
		else {
			const wrapper = wrapperRef.current;

			if (!wrapper) return;

			wrapper.classList.remove(c['--is-opened']);
			if (activeModal == undefined)
				wrapper.style.paddingLeft = `${window.innerWidth - document.body.offsetWidth}px`;
			setTimeout(() => {
				disableDisplay();
			}, 300);
		}
	}, [isOpened]);

	useEffect(() => {
		if (display) {
			const wrapper = wrapperRef.current;

			if (!wrapper) return;

			wrapper.classList.add(c['--is-opened']);
		}
	}, [display]);

	if (!display) return;

	return createPortal(
		<div
			className={clsx(c.wrapper, fullscreen && c['variant--fullscreen'])}
			data-name={name}
			ref={wrapperRef}
			{...props}
		>
			<Scrollbar>
				<div className={c.scrollContainer}>
					<div className={c.scrollInner}>
						<div className={clsx(c.inner, className)}>
							<button className={c.closeBtn} onClick={close}>
								<Icon name={'close-circle'} />
							</button>
							<header className={c.header}>
								<p className={c.caption}>{caption}</p>
								{subcaption && (
									<p className={c.subcaption}>
										{subcaptionIcon && (
											<Icon
												name={subcaptionIcon}
												className={c.subcaptionIcon}
											/>
										)}
										{subcaption}
									</p>
								)}
							</header>
							{children}
						</div>
					</div>
				</div>
			</Scrollbar>
			<div className={c.overlay} onClick={close}></div>
		</div>,
		document.body,
	);
};

export default Modal;
