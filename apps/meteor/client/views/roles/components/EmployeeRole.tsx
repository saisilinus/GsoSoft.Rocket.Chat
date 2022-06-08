import { Accordion, Box, RadioButton, Button, TextAreaInput, Field, FieldGroup, InputBox } from '@rocket.chat/fuselage';
import React, { useState } from 'react';

type Props = {
	title?: string;
	id: string;
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
};

const EmployeeRole = ({ title, id, onToggle }: Props) => {
	const [bio, setBio] = useState('');

	return (
		// @ts-ignore
		<Accordion.Item title={title} id={id} onToggle={onToggle}>
			<Box>
				<FieldGroup>
					<Field>
						<Field.Label>Add your bio</Field.Label>
						<Field.Row>
							<TextAreaInput value={bio} onChange={(e: any):void => setBio(e.target.value)} />
						</Field.Row>
					</Field>
				</FieldGroup>
				<Button primary style={{ float: 'right', marginTop: '20px' }}>
					Continue
				</Button>
			</Box>
		</Accordion.Item>
	);
};

export default EmployeeRole;
