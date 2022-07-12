import { Box } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

import WorkerProfile from './WorkerProfile';

type Props = {
	workerData: Record<string, any>[];
};

const WorkerGroup = ({ workerData }: Props): ReactElement => (
	<Box>
		{workerData.map((data, index) => (
			<WorkerProfile key={index} workerData={data} />
		))}
	</Box>
);

export default WorkerGroup;
