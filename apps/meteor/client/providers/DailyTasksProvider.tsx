import React, { ReactElement, useReducer } from 'react';

import { DispatchDailyTasksContext, DailyTasksContext } from '../contexts/DailyTasksContext/GlobalState';
import { DailyTasksReducer, InitialState } from '../contexts/DailyTasksContext/DailyTasksReducer';

const DailyTasksProvider = ({ children }): ReactElement => {
	const [global, dispatch] = useReducer(DailyTasksReducer, InitialState);
	return (
		<DispatchDailyTasksContext.Provider value={{ dispatch }}>
			<DailyTasksContext.Provider value={global}>{children}</DailyTasksContext.Provider>
		</DispatchDailyTasksContext.Provider>
	);
};

export default DailyTasksProvider;
