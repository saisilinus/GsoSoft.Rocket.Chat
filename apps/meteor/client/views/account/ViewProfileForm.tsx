import { IUser } from '@rocket.chat/core-typings';
import { Field, FieldGroup, Box } from '@rocket.chat/fuselage';
import { useSafely } from '@rocket.chat/fuselage-hooks';
import { useMethod, useTranslation } from '@rocket.chat/ui-contexts';
import { Meteor } from 'meteor/meteor';
import React, { useMemo, useEffect, useState, ReactElement } from 'react';

import UserAvatarEditor from '../../components/avatar/UserAvatarEditor';
import { useEndpointData } from '../../hooks/useEndpointData';
import ViewAccountInfo from './ViewAccountInfo';

type Props = {
	values: Record<string, unknown>;
	handlers: Record<string, (eventOrValue: unknown) => void>;
	user: IUser | null;
};

function ViewProfileForm({ values, handlers, user, ...props }: Props): ReactElement {
	const t = useTranslation();

	const getAvatarSuggestions = useMethod('getAvatarSuggestion');

	const [avatarSuggestions, setAvatarSuggestions] = useSafely(useState());

	const { email, username, password } = values;

	const { handleConfirmationPassword, handleAvatar } = handlers;

	useEffect(() => {
		const getSuggestions = async (): Promise<void> => {
			const suggestions = await getAvatarSuggestions();
			setAvatarSuggestions(suggestions);
		};
		getSuggestions();
	}, [getAvatarSuggestions, setAvatarSuggestions]);

	useEffect(() => {
		if (!password) {
			handleConfirmationPassword('');
		}
	}, [password, handleConfirmationPassword]);

	const handleSubmit = (e): void => {
		e.preventDefault();
	};

	// Refetch user data so that we can get createdAt field.
	const { value: data } = useEndpointData(
		/* @ts-ignore */
		`/v1/users.info`,
		/* @ts-ignore */
		useMemo(() => ({ ...(username && { username }) }), [username]),
	);

	const userWithCredit = useMemo(() => {
		/* @ts-ignore */
		const { user } = data || { user: { credit: 0, trustScore: 0 } };
		return user;
	}, [data]);

	const dummyCredit = {
		gateway: 'bank-transfer',
		quantity: 7,
		amount: 500,
		currency: 'USD',
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _buyCredit = useMemo(() => {
		if (!user?.credit) {
			Meteor.call('buyCredit', dummyCredit, (error, result) => {
				if (result) {
					console.log('Bought credit');
				}
				if (error) {
					console.log(error);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.credit]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _setRandomTrustScore = useMemo(() => {
		if (!user?.trustScore) {
			Meteor.call('setRandomTrustScore', (error, result) => {
				if (result) {
					console.log('Set a random trust score');
				}
				if (error) {
					console.log(error);
				}
			});
		}
	}, [user?.trustScore]);

	const careerItems = [
		/* @ts-ignore */
		{ icon: 'user', content: `${t('gso_viewProfileForm_careerItems_employee')}`, rc: true },
		{
			icon: 'credit',
			/* @ts-ignore */
			content: `${t('gso_viewProfileForm_careerItems_creditPoints')}: ${userWithCredit.credit !== 0 ? userWithCredit.credit : 0}`,
			rc: false,
		},
		{
			icon: 'trust-score',
			/* @ts-ignore */
			content: `${t('gso_viewProfileForm_careerItems_trustScore')}: ${
				userWithCredit?.trustScore !== undefined && userWithCredit?.trustScore !== 0 ? userWithCredit.trustScore * 100 : 0
			}/100`,
			rc: false,
		},
	];

	const privateInfo = [
		{ icon: 'mail', content: `${email}`, rc: true },
		{ icon: 'phone', content: '+254 730430234', rc: true },
		{ icon: 'gender', content: 'Male', rc: false },
	];

	const services = [
		/* @ts-ignore */
		{ icon: 'lock', content: `${t('gso_viewProfileForm_services_updateProfile')}`, rc: true },
		/* @ts-ignore */
		{ icon: 'file', content: `${t('gso_viewProfileForm_services_purchaseHistory')}`, rc: true },
		/* @ts-ignore */
		{ icon: 'info', content: `${t('gso_viewProfileForm_services_customerSupport')}`, rc: false },
		/* @ts-ignore */
		{ icon: 'credit-card', content: `${t('gso_viewProfileForm_services_verifyIdentity')}`, rc: false },
		/* @ts-ignore */
		{ icon: 'info', content: `${t('gso_viewProfileForm_services_aboutUs')}`, rc: false },
	];

	return (
		<FieldGroup is='form' style={{ marginTop: '0px !important' }} autoComplete='off' onSubmit={handleSubmit} {...props}>
			{useMemo(
				() => (
					<Field>
						<UserAvatarEditor
							etag={user?.avatarETag}
							currentUsername={user?.username}
							username={username}
							setAvatarObj={handleAvatar}
							disabled={true}
							suggestions={avatarSuggestions}
						/>
					</Field>
				),
				[username, user?.username, handleAvatar, avatarSuggestions, user?.avatarETag],
			)}
			<Box style={{ margin: '0px auto', fontSize: '16px' }}>{user?.bio ? user?.bio : 'No user bio...'}</Box>
			<Box display='flex' flexDirection='column' style={{ marginTop: '30px' }}>
				{/* @ts-ignore */}
				<ViewAccountInfo title={t('gso_viewProfileForm_viewAccountInfo_careerItems')} items={careerItems} />
				{/* @ts-ignore */}
				<ViewAccountInfo title={t('gso_viewProfileForm_viewAccountInfo_privateInfo')} items={privateInfo} />
				{/* @ts-ignore */}
				<ViewAccountInfo title={t('gso_viewProfileForm_viewAccountInfo_services')} items={services} />
			</Box>
		</FieldGroup>
	);
}

export default ViewProfileForm;
