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
	capitalize: Function;
};

const PerfectMoneyVoucher = ({ title, id, capitalize }: Props): ReactElement => {
	const [eVoucherNumber, setEVoucherNumber] = useState('');
	const [activationCode, setActivationCode] = useState('');
	const { dispatch } = useContext(DispatchPaymentResultContext);
	const t = useTranslation();

	const handleGatewaySubmit = (): void => {
		setEVoucherNumber('');
		setActivationCode('');
		Meteor.call(
			'buyCredit',
			{
				gateway: 'perfect-money-voucher',
				quantity: 80,
				amount: 524,
				currency: 'USD',
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
			<Box color='default' fontScale='p2'>
				{/* @ts-ignore */}
				<h4>{t('gso_topupView_perfectMoneyVoucher_title')}</h4>
				<Field>
					<Field.Row>
						{/* @ts-ignore */}
						<Field.Label htmlFor='e-voucher-number'>{t('gso_topupView_perfectMoneyVoucher_eVoucher')}</Field.Label>
						<InputBox
							type='text'
							id='e-voucher-number'
							value={eVoucherNumber}
							onChange={(e: any): void => setEVoucherNumber(e.target.value)}
						/>
					</Field.Row>
					<Field.Row>
						{/* @ts-ignore */}
						<Field.Label htmlFor='activation-code'>{t('gso_topupView_perfectMoneyVoucher_activationCode')}</Field.Label>
						<InputBox
							type='text'
							id='activation-code'
							value={activationCode}
							onChange={(e: any): void => setActivationCode(e.target.value)}
						/>
					</Field.Row>
					<Button primary style={{ marginTop: '12px' }} onClick={handleGatewaySubmit}>
						{/* @ts-ignore */}
						{t('gso_topupView_perfectMoneyVoucher_submitBtn')}
					</Button>
					<Field.Link href='#' style={{ marginTop: '5px' }}>
						{/* @ts-ignore */}
						{t('gso_topupView_perfectMoneyVoucher_eVoucherLink')}
					</Field.Link>
				</Field>
			</Box>
	);
};

export default PerfectMoneyVoucher;
