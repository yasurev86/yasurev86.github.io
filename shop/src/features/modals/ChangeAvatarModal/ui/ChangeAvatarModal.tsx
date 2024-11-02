'use client';

import { ChangeEvent, FC, useRef, useState } from 'react';
import c from './ChangeAvatarModal.module.scss';
import { Crop, PixelCrop, ReactCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDebounceEffect } from '@/shared/hooks';
import { canvasPreview } from '../helpers/canvasPreview';
import PreviewBlock from './PreviewBlock/PreviewBlock';
import {
	getFullNameString,
	useChangeAvatarMutation,
	useGetUserDataQuery,
} from '@/entities/User';
import { Modal, Btn } from '@/shared/ui/components';
import { useModal } from '@/shared/store/hooks';
import toast from 'react-hot-toast';
import { i18n } from '@/shared/i18n';

type IProps = {};
export const changeAvatarModalName = 'changeAvatar';
const ChangeAvatarModal: FC<IProps> = () => {
	const [imgSrc, setImgSrc] = useState('');
	const previewCanvasRef = useRef<HTMLCanvasElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const [crop, setCrop] = useState<Crop>();
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

	const onSelectFile = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined);
			const reader = new FileReader();
			reader.addEventListener('load', () =>
				setImgSrc(reader.result?.toString() || ''),
			);
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const { data, isLoading } = useGetUserDataQuery(undefined);

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				await canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
				);
			}
		},
		100,
		[completedCrop],
	);

	const [changeAvatar] = useChangeAvatarMutation();
	const { close } = useModal(changeAvatarModalName);

	const handleChange = async (): Promise<void> => {
		const image = imgRef.current;
		const previewCanvas = previewCanvasRef.current;
		if (!image || !previewCanvas || !completedCrop) {
			throw new Error('Crop canvas does not exist');
		}

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		const offscreen = new OffscreenCanvas(
			completedCrop.width * scaleX,
			completedCrop.height * scaleY,
		);
		const ctx = offscreen.getContext('2d');
		if (!ctx) throw new Error('No 2d context');

		ctx.drawImage(
			previewCanvas,
			0,
			0,
			previewCanvas.width,
			previewCanvas.height,
			0,
			0,
			offscreen.width,
			offscreen.height,
		);

		const blob = await offscreen.convertToBlob({
			type: 'image/png',
		});

		const formData = new FormData();
		formData.append('file', blob, 'avatar.png');

		await toast.promise(
			new Promise(async (resolve, reject) => {
				await changeAvatar(formData).then(res => {
					if ('error' in res) reject(res.error);

					close();
					resolve(res);
				});
			}),
			{
				loading: i18n('updating_avatar'),
				success: () => i18n('update_success'),
				error: () => i18n('update_error'),
			},
		);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<Modal
			caption={i18n('change_avatar')}
			name={changeAvatarModalName}
			className={c.modalInner}
			fullscreen
		>
			<input
				type="file"
				accept="image/*"
				onChange={onSelectFile}
				className={c.input}
				ref={inputRef}
			/>
			{!!imgSrc && (
				<ReactCrop
					crop={crop}
					onChange={(_, percentCrop) => setCrop(percentCrop)}
					onComplete={c => setCompletedCrop(c)}
					aspect={1}
					circularCrop
				>
					<img ref={imgRef} alt="" src={imgSrc} />
				</ReactCrop>
			)}
			{!!completedCrop && (
				<PreviewBlock
					className={c.previewBlock}
					canvasRef={previewCanvasRef}
					name={getFullNameString(data)}
					description={i18n('go_to_personal_account')}
				/>
			)}
			<div className={c.btns}>
				{!!imgSrc ? (
					<>
						<Btn
							onClick={() => {
								setImgSrc('');
								setCompletedCrop(undefined);
								inputRef.current?.click();
							}}
							use={'tertiary-accent'}
						>
							{i18n('choose_another_image')}
						</Btn>
						<Btn onClick={handleChange} fullWidth>
							{i18n('confirm')}
						</Btn>
					</>
				) : (
					<Btn onClick={() => inputRef.current?.click()} fullWidth>
						{i18n('choose_image')}
					</Btn>
				)}
			</div>
		</Modal>
	);
};

export default ChangeAvatarModal;
