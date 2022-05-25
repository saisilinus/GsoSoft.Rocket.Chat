import { Box, Icon } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

type Props = {
	title: string;
	handleRouteBack: React.MouseEventHandler<HTMLElement>;
};

const ProfileHeader = ({ title, handleRouteBack }: Props): ReactElement => (
	<Box style={{ height: '60px', marginTop: '10px' }} display='flex' alignItems='center'>
		<Icon name='chevron-right' style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleRouteBack} fontSize='32px' />
		<h4 style={{ fontWeight: 'bold', fontSize: '24px', marginLeft: '8px' }}>{title}</h4>
	</Box>
);

export default ProfileHeader;
