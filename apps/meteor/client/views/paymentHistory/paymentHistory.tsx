import { Box, Button, Icon, InputBox, Select } from '@rocket.chat/fuselage';
import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { useFormatDate } from '../../hooks/useFormatDate';
import PaymentModule from './components/paymentModule';

const PaymentHistory = () => {
	const [_statusSelect, setStatusSelect] = useState('');
	const [transactionResults, setTransactionResults] = useState<Record<string, any>[]>([]);
	const formatDate = useFormatDate();
	// const currentDate = new Date().getUTCDate();
	// const addDays = (days: number) => new Date(new Date().setDate(currentDate + days));

	useEffect(() => {
		Meteor.call('getTransactions', { offset: 1, count: 10 }, {}, (error, result) => {
			if (result) {
				console.log('Fetched transactions');
				setTransactionResults(result);
			}

			if (error) {
				console.log(error, 'error');
			}
		});
	}, []);
	return (
		<Page>
			<Icon name='chevron-right' fontSize='32px' />
			<Page.Header title='Purchase history' />
			<Page.ScrollableContentWithShadow>
				<Box display='flex' justifyContent='space-between'>
					<Box>
						<span>Range: </span>
						<InputBox type='text' defaultValue={formatDate(new Date().getDate())} onChange={function noRefCheck() {}} />
					</Box>
					<Box>
						<span>Status: </span>
						<Select
							onChange={(e: any) => setStatusSelect(e)}
							options={[
								['success', 'Success'],
								['fail', 'Fail'],
							]}
							placeholder='Success/Fail'
						/>
					</Box>
				</Box>
				{transactionResults.length
					? transactionResults.map((result, index) => (
							<PaymentModule
								gateway={result.gateway}
								amount={result.amount}
								quantity={result.quantity}
								currency={result.currency}
								key={index}
							/>
					  ))
					: 'Loading...'}
				<Box width='full' display='flex' justifyContent='center' style={{ marginTop: '20px' }}>
					<Button primary>Load More..</Button>
				</Box>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default PaymentHistory;
