import { Sidebar } from '@rocket.chat/fuselage';
import { useUser, useLayout, useTranslation } from '@rocket.chat/ui-contexts';
import React, { memo, ReactElement } from 'react';

import { useSidebarPaletteColor } from '../hooks/useSidebarPaletteColor';
import UserAvatarButton from './UserAvatarButton';
import CreateRoom from './actions/CreateRoom';
import Directory from './actions/Directory';
import Home from './actions/Home';
import Login from './actions/Login';
import Search from './actions/Search';
import Sort from './actions/Sort';

const HeaderWithData = (): ReactElement => {
	const user = useUser();
	const t = useTranslation();
	const { sidebar } = useLayout();
	useSidebarPaletteColor();

	return (
		<>
			<Sidebar.TopBar.Section className='sidebar--custom-colors'>
				<UserAvatarButton user={user} />
				<Sidebar.TopBar.Actions>
					<Home title={t('Home')} />
					<Search title={t('Search')} data-qa='sidebar-search' />
					{user && (
						<>
							<Directory title={t('Directory')} />
							<Sort title={t('Display')} />
							<CreateRoom title={t('Create_new')} data-qa='sidebar-create' />
						</>
					)}
					<Sidebar.TopBar.Action icon='circle-cross' onClick={(): void => sidebar.toggle()} />
					{!user && <Login title={t('Login')} />}
				</Sidebar.TopBar.Actions>
			</Sidebar.TopBar.Section>
		</>
	);
};

export default memo(HeaderWithData);
