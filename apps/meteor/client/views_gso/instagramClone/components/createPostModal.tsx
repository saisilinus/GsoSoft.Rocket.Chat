import { Dropzone, FileItem } from '@dropzone-ui/react';
import { Button, Field, FieldGroup, Icon, Modal, TextAreaInput } from '@rocket.chat/fuselage';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useState } from 'react';

type Props = {
	setOpenModal: Function;
};

const CreatePostModal = ({ setOpenModal }: Props): ReactElement => {
	const [files, setFiles] = useState([]);
	const images: string[] = [];
	// The share button should trigger sending the images or videos to cloudinary.
	const updateFiles = (incomingFiles: any): void => {
		setFiles(incomingFiles);
		console.log(incomingFiles);
		console.log(Meteor.settings.public.cloudinary);
		// add cloudinary code here.
		const uploadUrl = `https://api.cloudinary.com/v1_1/${Meteor.settings.public.cloudinary.name}/image/upload`;
		files.forEach(async (file) => {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', 'ml_default');
			formData.append('api_key', Meteor.settings.public.cloudinary.APIKey);
			try {
				const response = await fetch(uploadUrl, { method: 'POST', body: formData });
				const data = await response.json();
				images.push(data.secure_url);
			} catch (error) {
				console.error(error);
			} finally {
				console.log(images);
			}
		});
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
				<Button style={{ color: 'rgb(0, 149, 246)', background: 'transparent', border: 'none', fontSize: '16px' }}>Share</Button>
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
							<TextAreaInput placeholder='Add your caption...' />
						</Field.Row>
					</Field>
				</FieldGroup>
			</Modal.Content>
		</Modal>
	);
};

export default CreatePostModal;
