import { createContext, Dispatch as ReactDispatch } from 'react';

import { InitialState, IActionInterface } from './DailyTasksReducer';

export const DailyTasksContext = createContext(InitialState);

export const DispatchDailyTasksContext = createContext<{ dispatch: ReactDispatch<IActionInterface> }>({
	dispatch: () => undefined,
});
