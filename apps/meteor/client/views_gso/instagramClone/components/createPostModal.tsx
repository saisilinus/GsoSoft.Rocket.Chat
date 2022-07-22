// import { Dropzone, FileItem } from '@dropzone-ui/react';
import { Button, Field, FieldGroup, Icon, Modal, TextAreaInput } from '@rocket.chat/fuselage';
import React, { ReactElement, useState } from 'react';

const CreatePostModal = (): ReactElement => {
	const [files, setFiles] = useState([]);
	const updateFiles = (incommingFiles: any): void => {
		setFiles(incommingFiles);
		// even your own upload implementation
	};
	const removeFile = (id: string): void => {
		// @ts-ignore
		setFiles(files.filter((x) => x.id !== id));
	};
	return (
		<Modal>
			<Modal.Header display='flex' justifyContent='space-between'>
				<Icon mie='x4' name='chevron-right' size='x28' />
				<Modal.Title>Create new post</Modal.Title>
				<Button style={{ color: 'rgb(0, 149, 246)' }}>Share</Button>
			</Modal.Header>
			<Modal.Content display='flex' flexDirection='column'>
				{/* <Dropzone style={{ width: '100%' }} onChange={updateFiles} value={files}>
					{files.map((file) => (
						// @ts-ignore
						<FileItem {...file} onDelete={removeFile} key={file.id} info />
					))}
				</Dropzone> */}
				<FieldGroup>
					<Field>
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
