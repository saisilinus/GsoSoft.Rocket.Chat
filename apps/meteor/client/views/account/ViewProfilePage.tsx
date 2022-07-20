import { ButtonGroup, Button, Box, Icon } from '@rocket.chat/fuselage';
import {
	useSetModal,
	useToastMessageDispatch,
	useUser,
	useLogout,
	useSetting,
	useEndpoint,
	useMethod,
	useTranslation,
} from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
// @ts-ignore
import { SHA256 } from 'meteor/sha';
import React, { useState, useCallback, ReactElement } from 'react';

import { getUserEmailAddress } from '../../../lib/getUserEmailAddress';
import ConfirmOwnerChangeWarningModal from '../../components/ConfirmOwnerChangeWarningModal';
import Page from '../../components/Page';
import { useForm } from '../../hooks/useForm';
import ViewProfileForm from './ViewProfileForm';
import ActionConfirmModal from './profile/ActionConfirmModal';

const getInitialValues = (user): any => ({
	realname: user.name ?? '',
	email: getUserEmailAddress(user) ?? '',
	username: user.username ?? '',
	password: '',
	confirmationPassword: '',
	avatar: '',
	url: user.avatarUrl ?? '',
	statusText: user.statusText ?? '',
	statusType: user.status ?? '',
	bio: user.bio ?? '',
	customFields: user.customFields ?? {},
	nickname: user.nickname ?? '',
});

const ViewProfilePage = (): ReactElement => {
	const t = useTranslation();
	const dispatchToastMessage = useToastMessageDispatch();
	const user = useUser();

	const { values, handlers, hasUnsavedChanges, reset } = useForm(getInitialValues(user ?? {}));
	const setModal = useSetModal();
	const logout = useLogout();
	const [loggingOut, setLoggingOut] = useState(false);
	/* @ts-ignore */
	const logoutOtherClients = useEndpoint('POST', 'users.logoutOtherClients');
	const deleteOwnAccount = useMethod('deleteUserOwnAccount');

	const closeModal = useCallback(() => setModal(null), [setModal]);

	const erasureType = useSetting('Message_ErasureType');
	const allowDeleteOwnAccount = useSetting('Accounts_AllowDeleteOwnAccount');

	const handleEdit = (): void => {
		FlowRouter.go('/account/profile');
	};

	const handleLogoutOtherLocations = useCallback(async () => {
		setLoggingOut(true);
		try {
			// @ts-ignore
			await logoutOtherClients();
			dispatchToastMessage({
				type: 'success',
				message: t('Logged_out_of_other_clients_successfully'),
			});
		} catch (error) {
			dispatchToastMessage({ type: 'error', message: error });
		}
		setLoggingOut(false);
	}, [logoutOtherClients, dispatchToastMessage, t]);

	const handleConfirmOwnerChange = useCallback(
		(passwordOrUsername, shouldChangeOwner, shouldBeRemoved) => {
			const handleConfirm = async (): Promise<void> => {
				try {
					await deleteOwnAccount(SHA256(passwordOrUsername), true);
					dispatchToastMessage({ type: 'success', message: t('User_has_been_deleted') });
					closeModal();
					logout();
				} catch (error) {
					dispatchToastMessage({ type: 'error', message: error });
				}
			};

			return setModal(() => (
				<ConfirmOwnerChangeWarningModal
					onConfirm={handleConfirm}
					onCancel={closeModal}
					/* @ts-ignore */
					contentTitle={t(`Delete_User_Warning_${erasureType}`)}
					confirmLabel={t('Delete')}
					shouldChangeOwner={shouldChangeOwner}
					shouldBeRemoved={shouldBeRemoved}
				/>
			));
		},
		[closeModal, erasureType, setModal, t, deleteOwnAccount, dispatchToastMessage, logout],
	);

	const handleDeleteOwnAccount = useCallback(async () => {
		const handleConfirm = async (passwordOrUsername): Promise<any> => {
			try {
				await deleteOwnAccount(SHA256(passwordOrUsername));
				dispatchToastMessage({ type: 'success', message: t('User_has_been_deleted') });
				logout();
			} catch (error) {
				if (error.error === 'user-last-owner') {
					const { shouldChangeOwner, shouldBeRemoved } = error.details;
					return handleConfirmOwnerChange(passwordOrUsername, shouldChangeOwner, shouldBeRemoved);
				}

				dispatchToastMessage({ type: 'error', message: error });
			}
		};

		return setModal(() => <ActionConfirmModal onConfirm={handleConfirm} onCancel={closeModal} isPassword={true} />);
	}, [closeModal, dispatchToastMessage, setModal, handleConfirmOwnerChange, deleteOwnAccount, logout, t]);

	const handleRouteBack = (): void => {
		FlowRouter.go('/home');
	};

	return (
		<Page>
			<Box style={{ height: '60px', width: '100%', marginTop: '10px' }} display='flex' alignItems='center' justifyContent='space-between'>
				<Box display='flex'>
					<Icon name='chevron-right' style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleRouteBack} fontSize='32px' />
					<h4 style={{ fontWeight: 'bold', fontSize: '24px', marginLeft: '8px' }}>{t('Profile')}</h4>
				</Box>
				<ButtonGroup style={{ marginRight: '20px' }}>
					<Button primary danger disabled={!hasUnsavedChanges} onClick={reset}>
						{t('Reset')}
					</Button>
					<Button primary onClick={handleEdit}>
						{/* @ts-ignore */}
						{t('Gso_viewProfilePage_btnEdit')}
					</Button>
				</ButtonGroup>
			</Box>

			<Page.ScrollableContentWithShadow>
				<Box maxWidth='600px' w='full' alignSelf='center'>
					<ViewProfileForm values={values} handlers={handlers} user={user} />
					<ButtonGroup stretch mb='x12'>
						<Button onClick={handleLogoutOtherLocations} flexGrow={0} disabled={loggingOut}>
							{t('Logout_Others')}
						</Button>
						{allowDeleteOwnAccount && (
							<Button danger onClick={handleDeleteOwnAccount}>
								<Icon name='trash' size='x20' mie='x4' />
								{t('Delete_my_account')}
							</Button>
						)}
					</ButtonGroup>
				</Box>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default ViewProfilePage;
