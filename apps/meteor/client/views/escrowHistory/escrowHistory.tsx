import { Box, Button } from '@rocket.chat/fuselage';
/* @ts-ignore */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { useEndpointData } from '../../hooks/useEndpointData';
import { useQuery } from '../directory/hooks';
import CustomerSupport from '../paymentHistory/components/customerSupport';
import PaymentModule from '../paymentHistory/components/paymentModule';

const EscrowHistory = (): ReactElement => {
	const [escrowResults, setEscrowResults] = useState<Record<string, any>[]>([]);
	const [openModal, setModal] = useState(false);
	const [liveChatData, setLiveChatData] = useState<Record<string, any>>({});
	const [loading, setLoading] = useState(false);

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
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				handleDirectChatRoute('true');
			}
			if (error) {
				if (error.error === 'error-duplicate-channel-name') {
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					handleDirectChatRoute('false');
				}
			}
		});
	};

	const handleDirectChatRoute = (channelCreated: string): void => {
		setLoading(true);
		if (Object.keys(liveChatData).length) {
			// Create a new channel if the General channel is the only one available.
			// @ts-ignore
			const { result } = liveChatData;
			if (result.length === 1 && channelCreated === 'false') {
				createChannel();
			} else {
				setLoading(false);
				const routeName = result[1].fname;
				if (routeName) FlowRouter.go(`/channel/${routeName}`);
			}
		}
	};

	const fetchEscrowRecords = (type: string): void => {
		const queryOptions = {
			sort: {},
			query: {
				userId: Meteor.userId(),
			},
		};

		Meteor.call('getEscrows', { offset: 1, count: 10 }, queryOptions, (error, result) => {
			if (result) {
				console.log('Fetched Escrow records');
				if (type === 'initialFetch') {
					setEscrowResults(result);
				} else if (type === 'loadMore') {
					const newTransactionsArray = escrowResults.concat(result);
					setEscrowResults(newTransactionsArray);
				}
			}

			if (error) {
				console.log(error, 'error');
			}
		});
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const getLiveChatData = useMemo(() => setLiveChatData(data), [data]);

	// TODO: Get the route from react context.
	const handleRouteBack = (): void => {
		FlowRouter.go('/account/view-profile');
	};

	useEffect(() => {
		fetchEscrowRecords('initialFetch');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Page>
			<ProfileHeader title='Purchase history' handleRouteBack={handleRouteBack} />
			{/* @ts-ignore */}
			{openModal ? (
				<CustomerSupport
					closeModal={(): void => setModal(false)}
					directChatRoute={(): void => handleDirectChatRoute('false')}
					loading={loading}
				/>
			) : null}
			<Page.ScrollableContentWithShadow>
				{escrowResults.length
					? escrowResults.map((result, index) => (
						<PaymentModule
							page='escrowHistory'
							gateway={result.type}
							amount={result.amount}
							quantity={result.status}
							date={result.startedDate}
							key={index}
							openModal={(): void => setModal(true)}
						/>
					))
					: 'Loading...'}
				<Box width='full' display='flex' justifyContent='center' style={{ marginTop: '20px' }}>
					<Button primary onClick={(): void => fetchEscrowRecords('loadMore')}>
						Load More..
					</Button>
				</Box>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default EscrowHistory;
