import { Box, Button } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';

import Page from '../../../components/Page';

const PaymentResult = () => {
	const t = useTranslation();
	const successMessage = `You have successfully paid using`;

	return (
		<Page id='payment-result-page'>
			{/* @ts-ignore */}
			<Page.Header title={t('Payment result')} />
			<Box style={{ margin: '15px 15px 0 15px' }}>
				{/* @ts-ignore */}
				<h3 style={{ fontSize: '19px', marginBottom: '50px' }}>{successMessage}</h3>
				{/* @ts-ignore */}
				<p style={{ fontSize: '16px' }}>{t('gso_paymentResultPage_gateway')} Perfect Money Voucher</p>
				{/* @ts-ignore */}
				<p style={{ fontSize: '16px', marginTop: '20px' }}>{t('gso_paymentResultPage_credit')} 234</p>
				<Button primary style={{ position: 'absolute', bottom: '70px' }}>
					Continue
				</Button>
			</Box>
		</Page>
	);
};

export default PaymentResult;
