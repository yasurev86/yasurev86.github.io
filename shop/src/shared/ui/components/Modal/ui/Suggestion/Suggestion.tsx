import { FC, AllHTMLAttributes } from 'react';
import c from './Suggestion.module.scss';
import clsx from 'clsx';
import { useModal } from '@/shared/store/hooks';
import { MakeFieldsRequired } from '@/shared/types/utilityTypes';

type IProps = {
	btnText: string;
	modalName?: string;
} & Pick<AllHTMLAttributes<HTMLButtonElement>, 'onClick'> &
	Exclude<AllHTMLAttributes<HTMLDivElement>, 'onClick'>;

const SuggestionWithModal: FC<MakeFieldsRequired<IProps, 'modalName'>> = ({
	modalName,
	...props
}) => {
	const { open } = useModal(modalName);

	return <BaseSuggestion {...props} onClick={open} />;
};

const BaseSuggestion: FC<IProps> = ({
	className,
	btnText,
	onClick,
	children,
	...props
}) => {
	return (
		<div
			className={clsx(
				c.wrapper,
				!children && c['_is-soloBtn'],
				className,
			)}
			{...props}
		>
			{children}
			<button onClick={onClick}>{btnText}</button>
		</div>
	);
};

const Suggestion: FC<IProps> = ({ modalName, ...props }) => {
	if (modalName)
		return <SuggestionWithModal {...props} modalName={modalName} />;
	return <BaseSuggestion {...props} />;
};

export default Suggestion;
