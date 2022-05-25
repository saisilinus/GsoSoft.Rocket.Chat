import { useRouteParameter, useRoute, useCurrentRoute, useSetting, usePermission } from '@rocket.chat/ui-contexts';
import React, { useEffect } from 'react';

import NotAuthorizedPage from '../notAuthorized/NotAuthorizedPage';
import PaymentHistory from '../paymentHistory/paymentHistory';
import TopUpView from '../topup/TopUpView';
import PaymentResult from '../topup/components/PaymentResult';
import AccountIntegrationsPage from './AccountIntegrationsPage';
import AccountProfilePage from './AccountProfilePage';
import ViewProfilePage from './ViewProfilePage';
import AccountPreferencesPage from './preferences/AccountPreferencesPage';
import AccountSecurityPage from './security/AccountSecurityPage';
import AccountTokensPage from './tokens/AccountTokensPage';
import './sidebarItems';

const AccountRoute = () => {
	const [routeName] = useCurrentRoute();
	const page = useRouteParameter('group');
	const router = useRoute('account');

	useEffect(() => {
		if (routeName !== 'account') {
			return;
		}

		!page && router.push({ group: 'view-profile' });
	}, [routeName, page, router]);

	const webdavEnabled = useSetting('Webdav_Integration_Enabled');
	const canCreateTokens = usePermission('create-personal-access-tokens');

	if (page === 'profile') {
		return <AccountProfilePage />;
	}

	if (page === 'preferences') {
		return <AccountPreferencesPage />;
	}

	if (page === 'security') {
		return <AccountSecurityPage />;
	}

	if (page === 'integrations') {
		if (!webdavEnabled) {
			return <NotAuthorizedPage />;
		}

		return <AccountIntegrationsPage />;
	}

	if (page === 'tokens') {
		if (!canCreateTokens) {
			return <NotAuthorizedPage />;
		}

		return <AccountTokensPage />;
	}

	if (page === 'topup') {
		return <TopUpView />;
	}

	if (page === 'view-profile') {
		return <ViewProfilePage />;
	}

	if (page === 'payment-result') {
		return <PaymentResult />;
	}

	if (page === 'payment-history') {
		return <PaymentHistory />;
	}

	return null;
};

export default AccountRoute;
