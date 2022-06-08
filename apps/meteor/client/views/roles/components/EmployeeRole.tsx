import { Accordion, Box, Button, TextAreaInput, Field, FieldGroup } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import React, { useState } from 'react';

type Props = {
	title?: string;
	id: string;
    credits: number
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
};

const EmployeeRole = ({ title, id, onToggle }: Props) => {
	const [bio, setBio] = useState('');
    const t = useTranslation()

	return (
		// @ts-ignore
		<Accordion.Item title={title} id={id} onToggle={onToggle}>
			<Box>
				<FieldGroup>
					<Field>
                        {/* @ts-ignore */}
						<Field.Label>{t('gso_selectRoleView_employeeRole_fieldLabel')}</Field.Label>
						<Field.Row>
							<TextAreaInput value={bio} onChange={(e: any):void => setBio(e.target.value)} />
						</Field.Row>
					</Field>
				</FieldGroup>
				<Button primary style={{ float: 'right', marginTop: '20px' }}>
                {/* @ts-ignore */}
                {t('gso_selectRoleView_employeeRole_submitBtn')}
				</Button>
			</Box>
		</Accordion.Item>
	);
};

export default EmployeeRole;
