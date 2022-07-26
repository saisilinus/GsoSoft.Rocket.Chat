import { Dropzone, FileItem, FileValidated } from '@dropzone-ui/react';
import { IMediaPost } from '@rocket.chat/core-typings';
import { Button, Field, FieldGroup, Icon, Modal, TextAreaInput } from '@rocket.chat/fuselage';
import sha256 from 'crypto-js/sha256';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useState } from 'react';

type Props = {
	setOpenModal: Function;
};

const CreatePostModal = ({ setOpenModal }: Props): ReactElement => {
	const [caption, setCaption] = useState<IMediaPost['caption']>('');
	const [files, setFiles] = useState<FileValidated[]>([]);
	// The share button should trigger sending the images or videos to cloudinary.
	const share = (): void => {
		const images: string[] = [];
		const uploadUrl = `https://api.cloudinary.com/v1_1/${Meteor.settings.public.cloudinary.name}/image/upload`;
		files.forEach(async (fileData) => {
			const formData = new FormData();
			const timestamp = new Date().getTime();
			formData.append('file', fileData.file);
			formData.append('api_key', Meteor.settings.public.cloudinary.APIKey);
			formData.append('timestamp', `${timestamp}`);
			formData.append('signature', sha256(`timestamp=${timestamp}${Meteor.settings.public.cloudinary.APISecret}`).toString());
			try {
				const response = await fetch(uploadUrl, { method: 'POST', body: formData });
				const data = await response.json();
				images.push(data.secure_url);
			} catch (error) {
				console.error(error);
			}
		});
		Meteor.call('createMediaPost', { caption, images }, (error, result) => {
			if (result) {
				console.log(result, 'new post created!');
				setOpenModal(false);
			}

			if (error) {
				setOpenModal(false);
				console.log(result);
			}
		});
	};

	const updateFiles = (incomingFiles: FileValidated[]): void => {
		setFiles(incomingFiles);
	};
	const removeFile = (id: string): void => {
		// @ts-ignore
		setFiles(files.filter((x) => x.id !== id));
	};
	return (
		<Modal>
			<Modal.Header display='flex' justifyContent='space-between'>
				<Icon mie='x4' name='chevron-right' size='x28' style={{ cursor: 'pointer' }} onClick={(): void => setOpenModal(false)} />
				<Modal.Title>Create new post</Modal.Title>
				<Button style={{ color: 'rgb(0, 149, 246)', background: 'transparent', border: 'none', fontSize: '16px' }} onClick={share}>
					Share
				</Button>
			</Modal.Header>
			<Modal.Content display='flex' flexDirection='column' style={{ paddingBottom: '45px' }}>
				<Dropzone style={{ width: '100%' }} onChange={updateFiles} value={files}>
					{files.map((file) => (
						// @ts-ignore
						<FileItem {...file} onDelete={removeFile} key={file.id} info />
					))}
				</Dropzone>
				<FieldGroup>
					<Field style={{ marginTop: '14px' }}>
						<Field.Label>Caption</Field.Label>
						<Field.Row>
							<TextAreaInput placeholder='Add your caption...' onChange={(e): void => setCaption((e.target as HTMLInputElement).value)} />
						</Field.Row>
					</Field>
				</FieldGroup>
			</Modal.Content>
		</Modal>
	);
};

export default CreatePostModal;
