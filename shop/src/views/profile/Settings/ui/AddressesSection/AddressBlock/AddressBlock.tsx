import { FC } from 'react';
import c from './AddressBlock.module.scss';
import clsx from 'clsx';
import { Checkbox, Btn, Icon, Input } from '@/shared/ui/components';
import { IAddress } from '@/entities/User';
import { i18n } from '@/shared/i18n';

type IProps = {
	value: IAddress;
	setValue: (data: IAddress) => void;
	state?: 'edit' | 'default';
	handleDelete: () => void;
	ind: number;
	className?: string;
};
const AddressBlock: FC<IProps> = ({
	value,
	setValue,
	className,
	state = 'default',
	handleDelete,
	ind,
	...props
}) => {
	const { city, street, building, flat } = value;

	const handleChange = (
		key: keyof Omit<IAddress, 'id' | 'user'>,
		newValue: string,
	) => {
		setValue({ ...value, [key]: newValue });
	};

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			{state == 'default' ? (
				<Checkbox
					className={c.text}
				>{`${city}, ${i18n('street')} ${street}, ${i18n('building')} ${building}, ${i18n('flat')} ${flat}`}</Checkbox>
			) : (
				<>
					<div className={c.header}>
						<p className={c.caption}>
							{i18n('address_number', ind + 1)}
						</p>
						<Btn
							use={'tertiary'}
							size={'small'}
							onClick={handleDelete}
						>
							{i18n('delete')}
						</Btn>
					</div>
					<div className={clsx('row', c.inputs)}>
						<Input
							className={'col_3 col_768_6 col_428_12'}
							label={i18n('city')}
							value={city}
							onChange={e => handleChange('city', e.target.value)}
						/>
						<Input
							className={'col_5 col_768_6 col_428_12'}
							label={i18n('street')}
							value={street}
							onChange={e =>
								handleChange('street', e.target.value)
							}
						/>
						<Input
							className={'col_2 col_768_6 col_428_12'}
							label={i18n('building')}
							value={building}
							onChange={e =>
								handleChange('building', e.target.value)
							}
						/>
						<Input
							className={'col_2 col_768_6 col_428_12'}
							label={i18n('flat')}
							value={flat}
							onChange={e => handleChange('flat', e.target.value)}
						/>
					</div>
				</>
			)}
			<button className={c.deleteBtn} onClick={handleDelete}>
				<Icon name={'trash'} />
			</button>
		</div>
	);
};

export default AddressBlock;
