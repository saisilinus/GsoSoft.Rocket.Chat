/* eslint-disable react/no-multi-comp */
import { Accordion, Box, MultiSelect } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { ReactElement, useContext } from 'react';

import ListOfFreelancers from '../../../public/json_data/job-browse-by-city-district_response.json';
import AddressPicker from '../../components/AddressPicker/AddressPicker';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import WorkerGroup from '../hallOfFame/components/WorkerGroup';

const projectType = ['Hourly', 'Fixed Rate', 'Short-term', 'Long-term'];
const ranks = ['Rising Talent', 'Top Rated', 'Top Rated Plus', 'Expert Vetted'];

const BrowseFreelancersComponent = (): ReactElement => (
	<Accordion style={{ margin: '30px 0' }}>
		{projectType.map((project, index) => (
			<Accordion.Item title={project} key={index}>
				<Box display='flex' flexDirection='column'>
					<MultiSelect
						style={{ marginLeft: 'auto', marginBottom: '15px', width: '70%' }}
						options={[
							['1', ranks[0]],
							['2', ranks[1]],
							['3', ranks[2]],
							['4', ranks[3]],
						]}
						onChange={function (_params: string[]): void {
							throw new Error('Function not implemented.');
						}}
						placeholder='Sort by ranks'
					/>
					<WorkerGroup workerData={ListOfFreelancers} />
				</Box>
			</Accordion.Item>
		))}
	</Accordion>
);

const BrowseFreelancersView = (): ReactElement => {
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
			children={<BrowseFreelancersComponent />}
		/>
	);
};

export default BrowseFreelancersView;
