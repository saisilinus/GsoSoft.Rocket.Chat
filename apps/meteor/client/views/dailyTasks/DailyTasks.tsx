import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import TaskTab from './components/TaskTab';
import TasksModal from './components/TasksModal';
import { DailyTasksContext, DispatchDailyTasksContext } from '../../contexts/DailyTasksContext/GlobalState';

const DailyTasks = () => {
	const { value } = useContext(UserPreviousPageContext);
	const { dispatch } = useContext(DispatchDailyTasksContext);
	const { expiringTasks, upcomingTasks, completedTasks } = useContext(DailyTasksContext);
	const [modal, setModal] = useState(false);
	const [gift, setGift] = useState(false);
	const [tasks, setTasks] = useState<Record<string, any>[]>([]);

	const handleRouteBack = () => {
		FlowRouter.go(`${value.location}`);
	};

	// Clear the data in the reducer every five mins to force the page to refetch from
	// the backend.
	let timer;
	const refetchBackendResults = () => {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => {
			console.log('here');
			dispatch({ type: 'CLEAR_TASKS' });
		}, 30000);
	};
	// function refetchBackendResults() {
	// 	console.log('here');
	// 	dispatch({ type: 'CLEAR_TASKS' });
	// }

	// const refetchInterval = setInterval(refetchBackendResults, 30000);
	// clearInterval(refetchInterval);

	useEffect(() => {
		dispatch({ type: 'ADD_LOCATION', payload: { currentLocation: 'tasksPage' } });
	}, []);

	useEffect(() => {
		if (!expiringTasks.length || !upcomingTasks.length || !completedTasks) {
			Meteor.call('getTasks', { offset: 1, count: 10 }, {}, (error, result) => {
				if (result) {
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
				}

				if (error) {
					console.log(error, 'error');
				}
			});
		}
	}, [expiringTasks, upcomingTasks, completedTasks]);
	console.log(expiringTasks);

	const sortTasks = useMemo(() => {
		if (tasks.length) {
			let newUpComingTasks: any = [];
			let newExpiringTasks: any = [];
			let newCompletedTasks: any = [];

			tasks.map((task, index) => {
				if (index === tasks.length - 1) {
					dispatch({
						type: 'ADD_TASKS',
						payload: { expiringTasks: newExpiringTasks, upcomingTasks: newUpComingTasks, completedTasks: newCompletedTasks },
					});
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
