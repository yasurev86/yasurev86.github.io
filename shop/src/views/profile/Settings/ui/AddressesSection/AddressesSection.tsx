'use client';

import { FC, AllHTMLAttributes, useState, useContext, useEffect } from 'react';
import c from './AddressesSection.module.scss';
import clsx from 'clsx';
import { useToggle } from '@/shared/hooks';
import AddressBlock from './AddressBlock/AddressBlock';
import { MediaContext } from '@/_app/providers/MediaProvider';
import {
	useAddDeliveryAddressesMutation,
	useGetDeliveryAddressesQuery,
	useRemoveDeliveryAddressMutation,
	useUpdateDeliveryAddressesMutation,
} from '@/entities/User/api/userApi';
import { Btn, ConditionalLoadingBlock } from '@/shared/ui/components';
import AddressBlockSkeleton from './AddressBlock/AddressBlockSkeleton';
import { IAddress } from '@/entities/User';
import { i18n } from '@/shared/i18n';

type IProps = {} & AllHTMLAttributes<HTMLDivElement>;
const AddressesSection: FC<IProps> = ({ className, ...props }) => {
	const {
		max: { w427: maw427 },
	} = useContext(MediaContext);

	const {
		isActive: edit,
		enable: enableEdit,
		disable: disableEdit,
	} = useToggle();

	const { data, isFetching } = useGetDeliveryAddressesQuery(undefined);
	const [updateAddresses] = useUpdateDeliveryAddressesMutation();
	const [removeAddress] = useRemoveDeliveryAddressMutation();
	const [addAddresses] = useAddDeliveryAddressesMutation();

	useEffect(() => {
		if (!data) return;

		setAddresses(data);
	}, [isFetching]);

	const [addresses, setAddresses] = useState<IAddress[]>([]);

	const saveChanges = () => {
		disableEdit();
		if (!data) return;

		const forUpdate: {
			[id: number]: Omit<IAddress, 'id' | 'user'>;
		} = {};
		const forCreate: Omit<IAddress, 'id' | 'user'>[] = [];

		addresses.forEach(({ id, user, ...addressData }) => {
			if (id != -1) {
				const prev = data.find(el => el.id === id);

				if (prev) {
					if (
						prev.city != addressData.city ||
						prev.street != addressData.street ||
						prev.building != addressData.building ||
						prev.flat != addressData.flat
					) {
						forUpdate[id] = addressData;
					}
				}
			} else {
				forCreate.push(addressData);
			}
		});

		addAddresses(forCreate);
		updateAddresses(forUpdate);
	};

	const addLocalAddress = () => {
		enableEdit();
		setAddresses(cur => [
			...cur,
			{
				id: -1,
				user: -1,
				city: '',
				street: '',
				building: '',
				flat: '',
			},
		]);
	};

	const cancelEdit = () => {
		if (!data) return;

		setAddresses(data);
		disableEdit();
	};

	return (
		<div className={clsx(c.wrapper, className)} {...props}>
			<p className={c.caption}>{i18n('delivery_addresses')}</p>
			<ConditionalLoadingBlock
				isLoading={isFetching}
				data={addresses}
				fallback={Array.from({ length: 5 }).map(() => (
					<AddressBlockSkeleton />
				))}
				content={(items: IAddress[]) =>
					items.map((addressData, i) => (
						<AddressBlock
							key={addressData.id}
							value={addressData}
							setValue={newData =>
								setAddresses(cur => {
									let temp = [...cur];
									temp[i] = newData;
									return temp;
								})
							}
							ind={i}
							state={edit ? 'edit' : 'default'}
							handleDelete={() =>
								addressData.id !== -1
									? removeAddress(addressData.id)
									: setAddresses(cur => {
											let temp = [...cur];
											temp.splice(i, 1);
											return temp;
										})
							}
							className={c.address}
						/>
					))
				}
				emptyResult={
					<p className={c.empty}>{i18n('addresses_not_found')}</p>
				}
			/>
			{edit && (
				<Btn
					icon={'plus'}
					onClick={addLocalAddress}
					use={'tertiary-accent'}
					size={maw427 ? 'small' : 'medium'}
					className={c.addBtn}
				>
					{i18n('add_address')}
				</Btn>
			)}
			<div className={c.btns}>
				{edit ? (
					<>
						<Btn
							onClick={saveChanges}
							size={maw427 ? 'small' : undefined}
						>
							{i18n('save')}
						</Btn>
						<Btn
							onClick={cancelEdit}
							use={'tertiary-accent'}
							size={maw427 ? 'small' : 'medium'}
						>
							{i18n('cancel')}
						</Btn>
					</>
				) : (
					<>
						<Btn
							onClick={addLocalAddress}
							size={maw427 ? 'small' : undefined}
						>
							{i18n('add_address')}
						</Btn>
						{addresses && addresses.length !== 0 && (
							<Btn
								onClick={enableEdit}
								use={'tertiary-accent'}
								icon={'edit'}
								size={maw427 ? 'small' : 'medium'}
							>
								{i18n('edit_address')}
							</Btn>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default AddressesSection;
