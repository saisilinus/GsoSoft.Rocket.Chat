import React, { useContext, useState } from 'react';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import TaskTab from './components/TaskTab';
import TasksModal from './components/TasksModal';

type Props = {};

const DailyTasks = (props: Props) => {
	const { value } = useContext(UserPreviousPageContext);
	const [modal, setModal] = useState(false);
	const [gift, setGift] = useState(false);

	const handleRouteBack = () => {
		FlowRouter.go(`${value.location}`);
	};
	return (
		<Page>
			<ProfileHeader title='Pending tasks' handleRouteBack={handleRouteBack} />
			{modal ? <TasksModal gift={gift} closeModal={() => setModal(false)} /> : null}
			<Page.ScrollableContentWithShadow>
				<TaskTab title='EXPIRING' content={['Task 1', 'Task 2', 'Task 3']} setModal={setModal} setGift={setGift} />
				<TaskTab title='UPCOMING' content={['Task 1', 'Task 2', 'Task 3']} setModal={setModal} setGift={setGift} />
				<TaskTab title='COMPLETED' content={['Task 1', 'Task 2', 'Task 3']} setModal={setModal} setGift={setGift} />
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default DailyTasks;
