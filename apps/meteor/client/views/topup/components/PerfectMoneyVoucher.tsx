import { Accordion, Box, Button, Field, InputBox } from '@rocket.chat/fuselage';
import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { ReactElement, useContext, useState } from 'react';

import { DispatchPaymentResultContext, PaymentResultContext } from '../../../contexts/PaymentResultContext/GlobalState';

type Props = {
	title?: string;
	id: string;
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
	capitalize: Function;
};

const PerfectMoneyVoucher = ({ title, id, onToggle, capitalize }: Props): ReactElement => {
	const [eVoucherNumber, setEVoucherNumber] = useState('');
	const [activationCode, setActivationCode] = useState('');
	const { dispatch } = useContext(DispatchPaymentResultContext);

	const handleGatewaySubmit = () => {
		setEVoucherNumber('');
		setActivationCode('');
		Meteor.call(
			'buyCredit',
			{
				gateway: 'perfect-money-voucher',
				quantity: 18,
				amount: 524,
				currency: 'USD',
			},
			(error, result) => {
				if (result) {
					console.log(result, 'success');
					dispatch({
						type: 'ADD_RESULT_DETAILS',
						payload: { credit: result.amount, status: result.status, gateway: capitalize(result.gateway) },
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
				<h4>Enter your voucher</h4>
				<Field>
					<Field.Row>
						<Field.Label htmlFor='e-voucher-number'>E-voucher number</Field.Label>
						<InputBox type='text' id='e-voucher-number' value={eVoucherNumber} onChange={(e: any) => setEVoucherNumber(e.target.value)} />
					</Field.Row>
					<Field.Row>
						<Field.Label htmlFor='activation-code'>Activation code</Field.Label>
						<InputBox type='text' id='activation-code' value={activationCode} onChange={(e: any) => setActivationCode(e.target.value)} />
					</Field.Row>
					<Button primary style={{ marginTop: '12px' }} onClick={handleGatewaySubmit}>
						Submit
					</Button>
					<Field.Link href='#' style={{ marginTop: '5px' }}>
						How to buy e-voucher?
					</Field.Link>
				</Field>
			</Box>
		</Accordion.Item>
	);
};

export default PerfectMoneyVoucher;
