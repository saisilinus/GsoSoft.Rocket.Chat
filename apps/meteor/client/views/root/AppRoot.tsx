import React, { FC, lazy, Suspense } from 'react';
import { QueryClientProvider } from 'react-query';

import { OmnichannelRoomIconProvider } from '../../components/RoomIcon/OmnichannelRoomIcon/provider/OmnichannelRoomIconProvider';
import { queryClient } from '../../lib/queryClient';
import DailyTasksProvider from '../../providers/DailyTasksProvider';
import PageLoading from './PageLoading';

const ConnectionStatusBar = lazy(() => import('../../components/connectionStatus/ConnectionStatusBar'));
const MeteorProvider = lazy(() => import('../../providers/MeteorProvider'));
const BannerRegion = lazy(() => import('../banners/BannerRegion'));
const AppLayout = lazy(() => import('./AppLayout'));
const PortalsWrapper = lazy(() => import('./PortalsWrapper'));
const ModalRegion = lazy(() => import('../modal/ModalRegion'));

const AppRoot: FC = () => (
	<Suspense fallback={<PageLoading />}>
		<QueryClientProvider client={queryClient}>
			<MeteorProvider>
				<OmnichannelRoomIconProvider>
					<DailyTasksProvider>
						<ConnectionStatusBar />
						<BannerRegion />
						<AppLayout />
						<PortalsWrapper />
						<ModalRegion />
					</DailyTasksProvider>
				</OmnichannelRoomIconProvider>
			</MeteorProvider>
		</QueryClientProvider>
	</Suspense>
);

export default AppRoot;
