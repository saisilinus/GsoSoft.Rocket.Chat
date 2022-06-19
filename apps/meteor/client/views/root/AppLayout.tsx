import { Meteor } from 'meteor/meteor';
import React, { FC, Fragment, Suspense, useContext, useState, useMemo } from 'react';
import { useSubscription } from 'use-subscription';

import { appLayout } from '../../lib/appLayout';
import { blazePortals } from '../../lib/portals/blazePortals';
import PageLoading from './PageLoading';
import { useTooltipHandling } from './useTooltipHandling';
import { DailyTasksContext, DispatchDailyTasksContext } from '../../contexts/DailyTasksContext/GlobalState';

/**
 * Layout of front end
 * @constructor
 */
const AppLayout: FC = () => {
	useTooltipHandling();

	const layout = useSubscription(appLayout);
	const portals = useSubscription(blazePortals);
	const { currentLocation } = useContext(DailyTasksContext);
	const { dispatch } = useContext(DispatchDailyTasksContext);
	const [tasks, setTasks] = useState<Record<string, any>[]>([]);

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

	document.addEventListener('visibilitychange', (event) => {
		if (document.visibilityState === 'visible') {
			if (currentLocation === 'tasksPage') {
				// Refetch tasks when a user switches tabs.
				Meteor.call('getTasks', { offset: 1, count: 10 }, {}, (error, result) => {
					if (result.length) {
						setTasks(result);
					}

					if (error) {
						console.log(error, 'error');
					}
				});
			}
		}
	});

	return (
		<>
			<Suspense fallback={<PageLoading />}>{layout}</Suspense>
			{portals.map(({ key, node }) => (
				<Fragment key={key} children={node} />
			))}
		</>
	);
};

export default AppLayout;
