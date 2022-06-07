import { Box, Button, Select } from '@rocket.chat/fuselage';
/* @ts-ignore */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { isMobile, isDesktop } from 'react-device-detect';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { useEndpointData } from '../../hooks/useEndpointData';
import { useQuery } from '../directory/hooks';
import DateRangePicker from '../omnichannel/analytics/DateRangePicker';
import CustomerSupport from './components/customerSupport';
import PaymentModule from './components/paymentModule';

interface IDateRange {
	start: string;
	end: string;
}

const PaymentHistory = (): ReactElement => {
	const [_statusSelect, setStatusSelect] = useState('');
	const [_dateRange, setDateRange] = useState<IDateRange>({ start: '', end: '' });
	const [transactionResults, setTransactionResults] = useState<Record<string, any>[]>([]);
	const [openModal, setModal] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [initialLoad, setInitialLoad] = useState(true);
	const [channelCreated, setChannelCreated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [liveChatData, setLiveChatData] = useState<Record<string, any>>({});

	const handeDateRange = (range: any): void => {
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

		Meteor.call('getTransactions', { offset: 1, count: 10 }, queryOptions, (error, result) => {
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

	const handleRouteBack = (): void => {
		FlowRouter.go('/account/view-profile');
	};

	const sort = ['name', 'asc'];
	const params = { current: 0, itemsPerPage: 25 };
	// @ts-ignore
	const query = useQuery(params, sort, 'channels');
	// @ts-ignore
	const { value: data } = useEndpointData('directory', query);
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const createChannel = () => {
		Meteor.call('createChannel', 'ryan-livechat', [''], (error, result) => {
			if (result) {
				setChannelCreated(true);
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				handleDirectChatRoute();
			}
			if (error) {
				if (error.error === 'error-duplicate-channel-name') {
					setChannelCreated(true);
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					handleDirectChatRoute();
				}
			}
		});
	};

	const handleDirectChatRoute = (): void => {
		setLoading(true);
		if (Object.keys(liveChatData).length) {
			// Create a new channel if the General channel is the only one available.
			// @ts-ignore
			const { result } = liveChatData;
			if (result.length === 1 && !channelCreated) {
				createChannel();
			} else {
				setLoading(false);
				const routeName = result[1].fname;
				if (routeName) FlowRouter.go(`/channel/${routeName}`);
			}
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const getLiveChatData = useMemo(() => setLiveChatData(data), [data]);

	useEffect(() => {
		fetchTransactions('initialFetch');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_statusSelect, _dateRange]);
	return (
		<Page>
			<ProfileHeader title='Purchase history' handleRouteBack={handleRouteBack} />
			{/* @ts-ignore */}
			{openModal ? (
				<CustomerSupport closeModal={(): void => setModal(false)} directChatRoute={(): void => handleDirectChatRoute()} loading={loading} />
			) : null}
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
