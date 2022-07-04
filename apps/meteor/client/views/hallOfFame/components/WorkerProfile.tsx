import { Box, Icon } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

type Props = {
	workerData: Record<string, any>;
};

const WorkerProfile = ({ workerData }: Props): ReactElement => (
	<Box display='flex' flexDirection='column' style={{ marginTop: '15px', marginRight: '8px' }}>
		<p>{workerData.name}</p>
		<p>
			<span style={{ fontWeight: 'bold' }}>Joined: </span>3 months ago
		</p>
		<Icon mie='x4' name='user' size='x96' />
		<Box display='flex' alignItems='center'>
			<Icon mie='x4' name='star' size='x20' />
			<p style={{ fontWeight: 'bold' }}>{workerData.ratingScore.slice(0, 1)}/10</p>
		</Box>
		<p>{workerData.address}</p>
		{/* Might change into a dynamic component soon */}
		<p style={{ fontWeight: 'bold' }}>60$/hour</p>
	</Box>
);

export default WorkerProfile;
