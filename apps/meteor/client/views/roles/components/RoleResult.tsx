import { Box, Button } from '@rocket.chat/fuselage';
import { useTranslation, useUser } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { useContext, useMemo, useState } from 'react';

import Page from '../../../components/Page';
import { PaymentResultContext } from '../../../contexts/PaymentResultContext/GlobalState';
import { UserPreviousPageContext } from '../../../contexts/UserPreviousPageContext/GlobalState';
import { useEndpointData } from '../../../hooks/useEndpointData';

const RoleResult = () => {
	const { role } = useContext(PaymentResultContext);
	const { value } = useContext(UserPreviousPageContext);
	const [userCredit, setUserCredit] = useState(0);
	const t = useTranslation();

	const successMessage = 'You have successfully selected a new role';

	const user = useUser();

	const { username } = user;

	const { value: data } = useEndpointData(
		`/v1/users.info`,
		// @ts-ignore
		useMemo(() => ({ ...(username && { username }) }), [username]),
	);

	const _setUserData = useMemo(() => {
		if (data) {
			const { user } = data;
			setUserCredit(user.credit);
		}
	}, [data]);

	const handleRerouting = (): void => {
		FlowRouter.go(`${value.location}`);
	};

	return (
		<Page id='payment-result-page'>
			{/* @ts-ignore */}
			<Page.Header title={t('Payment result')} />
			<Box style={{ margin: '15px 15px 0 15px' }}>
				{/* @ts-ignore */}
				<h3 style={{ fontSize: '19px', marginBottom: '50px' }}>{successMessage}</h3>
				<p style={{ fontSize: '16px' }}>
					{/* @ts-ignore */}
					Your new role is: {role}
				</p>
				<p style={{ fontSize: '16px', marginTop: '20px' }}>
					{/* @ts-ignore */}
					Remaining credit: {userCredit}
				</p>
				<Button primary style={{ position: 'absolute', bottom: '70px' }} onClick={handleRerouting}>
					Continue
				</Button>
			</Box>
		</Page>
	);
};

export default RoleResult;
