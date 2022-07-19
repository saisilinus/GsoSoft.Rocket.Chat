import { Box } from '@rocket.chat/fuselage';
import React, { ReactElement, useEffect, useState } from 'react';

import { useShuffle } from '../../../hooks/useShuffleArray';
import WorkerProfile from './WorkerProfile';

type Props = {
	workerData: Record<string, any>[];
	component: string;
};

const WorkerGroup = ({ workerData, component }: Props): ReactElement => {
	const [listOfWorkers, setListOfWorkers] = useState<Record<string, any>[]>([]);
	const arrayShuffle = useShuffle();
	useEffect(() => {
		if (component === 'hallOfFame') {
			const shuffled = arrayShuffle(workerData);
			setListOfWorkers(shuffled.slice(0, 3));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box
			display={`${component === 'hallOfFame' ? 'flex' : 'block'}`}
			justifyContent={`${component === 'hallOfFame' ? 'space-between' : ''}`}
		>
			{component === 'hallOfFame'
				? listOfWorkers.map((data, index) => <WorkerProfile key={index} workerData={data} />)
				: workerData.map((data, index) => <WorkerProfile key={index} workerData={data} />)}
		</Box>
	);
};

export default WorkerGroup;
