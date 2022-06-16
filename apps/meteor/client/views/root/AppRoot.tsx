import React, { FC, lazy, Suspense } from 'react';
import { Meteor } from 'meteor/meteor';
import { QueryClientProvider } from 'react-query';

import { OmnichannelRoomIconProvider } from '../../components/RoomIcon/OmnichannelRoomIcon/provider/OmnichannelRoomIconProvider';
import { queryClient } from '../../lib/queryClient';
import PageLoading from './PageLoading';

const ConnectionStatusBar = lazy(() => import('../../components/connectionStatus/ConnectionStatusBar'));
const MeteorProvider = lazy(() => import('../../providers/MeteorProvider'));
const BannerRegion = lazy(() => import('../banners/BannerRegion'));
const AppLayout = lazy(() => import('./AppLayout'));
const PortalsWrapper = lazy(() => import('./PortalsWrapper'));

const AppRoot: FC = () => {
	document.addEventListener('visibilitychange', (event) => {
		if (document.visibilityState === 'visible') {
			// If it's a new day then a user's number of consective logins is increased.
			Meteor.call('setUserReward');
		}
	});
	return (
		<Suspense fallback={<PageLoading />}>
			<MeteorProvider>
				<QueryClientProvider client={queryClient}>
					<OmnichannelRoomIconProvider>
						<ConnectionStatusBar />
						<BannerRegion />
						<AppLayout />
						<PortalsWrapper />
					</OmnichannelRoomIconProvider>
				</QueryClientProvider>
			</MeteorProvider>
		</Suspense>
	);
};

export default AppRoot;
