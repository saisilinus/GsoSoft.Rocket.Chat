import { Accordion, Box, Button, TextAreaInput, Field, FieldGroup } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import React, { useState } from 'react';

import {dispatchToastMessage} from '../../../lib/toast'

type Props = {
	title?: string;
	id: string;
    credits: number
    cmpConfig: Record<string, any>
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
};

const EmployeeRole = ({ title, id, credits, cmpConfig, onToggle }: Props) => {
	const [bio, setBio] = useState('');
    const t = useTranslation()

	const handleSubmit = () => {
		if (credits >= cmpConfig.escrow) {
		  Meteor.call('addEscrow', {amount: cmpConfig.escrow, type: id}, (error, result) => {
			if (result) {
				console.log(result, 'result')
			// @ts-ignore
			dispatchToastMessage({type: 'success', message: t('gso_selectRoleView_successMessage')})
			}
  
			if (error) {
			  // @ts-ignore
			  dispatchToastMessage({type: 'error', message: error})
			}
		  })
		  
		} else {
		  // @ts-ignore
		  dispatchToastMessage({type: 'error', message: t('gso_selectRoleView_errorMessage')})
		}
	  }

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
				<Button primary style={{ float: 'right', marginTop: '20px' }} onClick={handleSubmit}>
                {/* @ts-ignore */}
                {t('gso_selectRoleView_employeeRole_submitBtn')}
				</Button>
			</Box>
		</Accordion.Item>
	);
};

export default EmployeeRole;
