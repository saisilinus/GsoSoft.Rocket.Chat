/* eslint-disable react/no-multi-comp */
import { Tile } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { ReactElement, useContext } from 'react';

import ListOfFame from '../../../public/json_data/job-hall-of-fame-cityB.json';
import AddressPicker from '../../components/AddressPicker/AddressPicker';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import WorkerGroup from './components/WorkerGroup';

const HallOfFameComponent = (): ReactElement => (
	<>
		{ListOfFame.map((workerList, index) => (
			<Tile key={index} style={{ marginBottom: '45px' }}>
				{/* @ts-ignore */}
				<h3 style={{ fontSize: '19px', marginBottom: '10px' }}>{workerList.name}</h3>
				<WorkerGroup workerData={workerList.items} />
			</Tile>
		))}
	</>
);

const HallOfFameView = (): ReactElement => {
	const { value } = useContext(UserPreviousPageContext);
	const t = useTranslation();

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};
	return (
		<AddressPicker
			id='hall-of-fame'
			// @ts-ignore
			title={t('gso_hallOfFamePage_header')}
			handleRouteBack={handleRouteBack}
			children={<HallOfFameComponent />}
		/>
	);
};

export default HallOfFameView;
