import { Box, Button, Icon, InputBox, Select } from '@rocket.chat/fuselage';
/* @ts-ignore */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { useFormatDate } from '../../hooks/useFormatDate';
import CustomerSupport from './components/customerSupport';
import PaymentModule from './components/paymentModule';

const PaymentHistory = () => {
	const [_statusSelect, setStatusSelect] = useState('');
	const [transactionResults, setTransactionResults] = useState<Record<string, any>[]>([]);
	const [openModal, setModal] = useState(false);
	const formatDate = useFormatDate();
	const fetchTransactions = (type: string) => {
		Meteor.call('getTransactions', { offset: 1, count: 10 }, {}, (error, result) => {
			if (result) {
				console.log('Fetched transactions');
				if (type === 'initialFetch') {
					setTransactionResults(result);
				} else if (type === 'loadMore') {
					const newTransactionsArray = transactionResults.concat(result);
					setTransactionResults(newTransactionsArray);
				}
			}

			if (error) {
				console.log(error, 'error');
			}
		});
	};

	const handleRouteBack = () => {
		FlowRouter.go('/account/view-profile');
	};
	// const currentDate = new Date().getUTCDate();
	// const addDays = (days: number) => new Date(new Date().setDate(currentDate + days));

	useEffect(() => {
		fetchTransactions('initialFetch');
	}, []);
	return (
		<Page>
			<Box style={{ height: '60px', marginTop: '10px' }} display='flex' alignItems='center'>
				<Icon name='chevron-right' style={{ marginLeft: '30px', cursor: 'pointer' }} onClick={handleRouteBack} fontSize='32px' />
				<h4 style={{ fontWeight: 'bold', fontSize: '24px', marginLeft: '18px' }}>Purchase history</h4>
			</Box>
			{openModal ? <CustomerSupport closeModal={() => setModal(false)} /> : null}
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
								date={result.createdAt}
								key={index}
								openModal={() => setModal(true)}
							/>
					  ))
					: 'Loading...'}
				<Box width='full' display='flex' justifyContent='center' style={{ marginTop: '20px' }}>
					<Button primary onClick={() => fetchTransactions('loadMore')}>
						Load More..
					</Button>
				</Box>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default PaymentHistory;
