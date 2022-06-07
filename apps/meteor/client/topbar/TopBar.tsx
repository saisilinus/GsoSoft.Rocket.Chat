import { TopBarTitle, TopBarToolBox, TopBarActions, TopBarAction, Menu, Box, Icon } from '@rocket.chat/fuselage';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { ReactElement, useContext } from 'react';
import { DispatchPreviousPageContext } from '../contexts/UserPreviousPageContext/GlobalState';

type Props = {
	location?: string
}

const TopBar = ({location}: Props): ReactElement => {
	const { dispatch } = useContext(DispatchPreviousPageContext);

	return (
	<TopBarToolBox>
		<TopBarTitle>RocketChat App</TopBarTitle>
		<TopBarActions>
			<TopBarAction icon='bell' />
			<Menu
				className='topBarMenu'
				options={{
					selectRole: {
						action: function noRefCheck(): void {
							// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
							dispatch({ type: 'ADD_LOCATION', payload: { location: `/${location}` } });
							FlowRouter.go('/select-role')
						},
						label: (
							<Box alignItems='center' display='flex'>
								<Icon mie='x4' name='user' size='x16' />
								Select a role
							</Box>
						),
					},
					logout: {
						action: function noRefCheck(): void {
							// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
							console.log('refCheck');
						},
						label: (
							<Box alignItems='center' color='danger' display='flex'>
								<Icon mie='x4' name='trash' size='x16' />
								Logout
							</Box>
						),
					},
					changePassword: {
						action: function noRefCheck(): void {
							// This so as to allow the linting to pass - @typescript-eslint/no-empty-function
							console.log('refCheck');
						},
						label: (
							<Box alignItems='center' display='flex'>
								<Icon mie='x4' name='key' size='x16' />
								Change Password
							</Box>
						),
					},
				}}
			>
				<Icon name='avatar' size='x30' />
			</Menu>
		</TopBarActions>
	</TopBarToolBox>
)}

export default TopBar;
