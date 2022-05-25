import { Box, Button, Icon, InputBox, Select } from '@rocket.chat/fuselage';
/* @ts-ignore */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import CustomerSupport from './components/customerSupport';
import PaymentModule from './components/paymentModule';

const PaymentHistory = () => {
	const [_statusSelect, setStatusSelect] = useState('');
	const [_dateRange, setDateRange] = useState('');
	const [transactionResults, setTransactionResults] = useState<Record<string, any>[]>([]);
	const [openModal, setModal] = useState(false);

	const fetchTransactions = (type: string) => {
		const currentDate = new Date().getUTCDate();
		const addDays = (days: number) => new Date(new Date().setDate(currentDate + days));

		let queryOptions = {
			sort: {},
			query: {
				createdBy: Meteor.userId(),
			},
		};
		if (_statusSelect) {
			queryOptions.query['status'] = _statusSelect;
		}

		if (_dateRange) {
			const numOfDays = parseInt(_dateRange);
			const result = addDays(-numOfDays);
			queryOptions.query['createdAt'] = { $gte: result };
		}

		console.log(queryOptions, 'queryOptions');

		Meteor.call('getTransactions', { offset: 1, count: 10 }, queryOptions, (error, result) => {
			if (result) {
				console.log('Fetched transactions');
				if (type === 'initialFetch') {
					console.log(result, 'result');
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

	useEffect(() => {
		fetchTransactions('initialFetch');
	}, [_statusSelect, _dateRange]);
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
						<Select
							onChange={(e: any) => setDateRange(e)}
							options={[
								['7', '7 days'],
								['30', '30 days'],
								['90', '90 days'],
							]}
							placeholder='Date range'
						/>
					</Box>
					<Box>
						<span>Status: </span>
						<Select
							onChange={(e: any) => setStatusSelect(e)}
							options={[
								['success', 'Success'],
								['error', 'Fail'],
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
