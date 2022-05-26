import { Box, Button, Select } from '@rocket.chat/fuselage';
/* @ts-ignore */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { isMobile, isDesktop } from 'react-device-detect';
import React, { ReactElement, useEffect, useState } from 'react';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import DateRangePicker from '../omnichannel/analytics/DateRangePicker';
import CustomerSupport from './components/customerSupport';
import PaymentModule from './components/paymentModule';

interface dateRange {
	start: string;
	end: string;
}

const PaymentHistory = (): ReactElement => {
	const [_statusSelect, setStatusSelect] = useState('');
	const [_dateRange, setDateRange] = useState<dateRange>({ start: '', end: '' });
	const [transactionResults, setTransactionResults] = useState<Record<string, any>[]>([]);
	const [openModal, setModal] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);

	const handeDateRange = (range: any): void => {
		console.log(range, 'range');
		setDateRange(range);
	};

	const fetchTransactions = (type: string): void => {
		const convertDate = (initialDate: string): Date => new Date(initialDate);

		const queryOptions = {
			sort: {},
			query: {
				createdBy: Meteor.userId(),
			},
		};
		if (_statusSelect) {
			// eslint-disable-next-line dot-notation
			queryOptions.query['status'] = _statusSelect;
		}

		if (_dateRange) {
			const startDate = convertDate(_dateRange.start);
			const endDate = convertDate(_dateRange.end);
			// eslint-disable-next-line dot-notation
			queryOptions.query['createdAt'] = { $gte: startDate, $lte: endDate };
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

	const handleRouteBack = (): void => {
		FlowRouter.go('/account/view-profile');
	};

	useEffect(() => {
		fetchTransactions('initialFetch');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_statusSelect, _dateRange]);
	return (
		<Page>
			<ProfileHeader title='Purchase history' handleRouteBack={handleRouteBack} />
			{openModal ? <CustomerSupport closeModal={(): void => setModal(false)} /> : null}
			<Page.ScrollableContentWithShadow>
				{isMobile ? (
					<Box style={{ marginBottom: '12px' }}>
						<span>Range: </span>
						<DateRangePicker onChange={handeDateRange} initialLoad={initialLoad} />
					</Box>
				) : null}
				<Box display='flex' justifyContent='space-between'>
					{isDesktop ? (
						<Box>
							<span>Range: </span>
							<DateRangePicker onChange={handeDateRange} initialLoad={initialLoad} />
						</Box>
					) : null}

					<Box display='flex' flexDirection='column'>
						<span>Status: </span>
						<Select
							onChange={(e: any): void => setStatusSelect(e)}
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
								openModal={(): void => setModal(true)}
							/>
					  ))
					: 'Loading...'}
				<Box width='full' display='flex' justifyContent='center' style={{ marginTop: '20px' }}>
					<Button primary onClick={(): void => fetchTransactions('loadMore')}>
						Load More..
					</Button>
				</Box>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default PaymentHistory;
