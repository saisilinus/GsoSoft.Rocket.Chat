import { Accordion, Box, Button, Field, InputBox } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useContext, useState } from 'react';

import { DispatchPaymentResultContext } from '../../../contexts/PaymentResultContext/GlobalState';

type Props = {
	title?: string;
	id: string;
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
	capitalize: Function;
};

const BankTransfer = ({ title, id, onToggle, capitalize }: Props): ReactElement => {
	const [bank1, setBank1] = useState(3424323434);
	const [bank2, setBank2] = useState(6464534675);
	const [bank3, setBank3] = useState(1454254545);
	const t = useTranslation();
	const { dispatch } = useContext(DispatchPaymentResultContext);

	const handleGatewaySubmit = (): void => {
		setBank1(0);
		setBank2(0);
		setBank3(0);
		Meteor.call(
			'buyCredit',
			{
				gateway: 'bank-transfer',
				quantity: 50,
				amount: 358,
				currency: 'KES',
			},
			(error, result) => {
				if (result) {
					console.log(result, 'success');
					dispatch({
						type: 'ADD_RESULT_DETAILS',
						payload: { credit: result.quantity, status: result.status, gateway: capitalize(result.gateway) },
					});
					FlowRouter.go('/account/payment-result');
				}

				if (error) {
					console.log(error, 'error');
				}
			},
		);
	};

	return (
		// @ts-ignore
		<Accordion.Item title={title} id={id} onToggle={onToggle}>
			<Box color='default' fontScale='p2'>
				{/* @ts-ignore */}
				<p style={{ fontSize: '16px' }}>{t('gso_topupView_bankTransfer')}</p>
				<Field>
					<Field.Label htmlFor='bank-1'>Bank 1</Field.Label>
					<Field.Row>
						<InputBox type='text' id='bank-1' value={bank1} onChange={(e: any): void => setBank1(e.target.value)} />
					</Field.Row>
					<Field.Label htmlFor='bank-2'>Bank 2</Field.Label>
					<Field.Row>
						<InputBox type='text' id='bank-2' value={bank2} onChange={(e: any): void => setBank2(e.target.value)} />
					</Field.Row>
					<Field.Label htmlFor='bank-3'>Bank 3</Field.Label>
					<Field.Row>
						<InputBox type='text' id='bank-3' value={bank3} onChange={(e: any): void => setBank3(e.target.value)} />
					</Field.Row>
					<Button primary style={{ marginTop: '12px' }} onClick={handleGatewaySubmit}>
						{/* @ts-ignore */}
						{t('gso_topupView_bankTransferBtn')}
					</Button>
				</Field>
			</Box>
		</Accordion.Item>
	);
};

export default BankTransfer;
