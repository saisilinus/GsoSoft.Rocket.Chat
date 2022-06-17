import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Meteor } from 'meteor/meteor';
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
	const [tasks, setTasks] = useState<Record<string, any>[]>([]);
	const [expiringTasks, setExpiringTasks] = useState<Record<string, any>[]>([]);
	const [upcomingTasks, setUpcomingTasks] = useState<Record<string, any>[]>([]);
	const [completedTasks, setCompletedTasks] = useState<Record<string, any>[]>([]);

	const handleRouteBack = () => {
		FlowRouter.go(`${value.location}`);
	};

	useEffect(() => {
		Meteor.call('getTasks', { offset: 1, count: 10 }, {}, (error, result) => {
			if (result.length) {
				setTasks(result);
			} else {
				Meteor.call('seed', (error, result) => {
					if (result.length) {
						setTasks(result);
					}

					if (error) {
						console.log(error, 'error');
					}
				});
			}

			if (error) {
				console.log(error, 'error');
			}
		});
	}, []);

	const sortTasks = useMemo(() => {
		if (tasks.length) {
			let newUpComingTasks: any = [];
			let newExpiringTasks: any = [];
			let newCompletedTasks: any = [];

			tasks.map((task, index) => {
				if (index === tasks.length - 1) {
					setUpcomingTasks(newUpComingTasks);
					setExpiringTasks(newExpiringTasks);
					setCompletedTasks(newCompletedTasks);
				}

				if (task.status === -1) {
					newUpComingTasks.push(task);
				} else if (task.status === 0) {
					newExpiringTasks.push(task);
				} else if (task.status === 1) {
					newCompletedTasks.push(task);
				}
			});
		}
	}, [tasks]);

	return (
		<Page>
			<ProfileHeader title='Pending tasks' handleRouteBack={handleRouteBack} />
			{modal ? <TasksModal gift={gift} closeModal={() => setModal(false)} /> : null}
			<Page.ScrollableContentWithShadow>
				<TaskTab title='EXPIRING' content={expiringTasks} setModal={setModal} setGift={setGift} />
				<TaskTab title='UPCOMING' content={upcomingTasks} setModal={setModal} setGift={setGift} />
				<TaskTab title='COMPLETED' content={completedTasks} setModal={setModal} setGift={setGift} />
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default DailyTasks;
