export interface IStateInterface {
	expiringTasks: Record<string, any>[];
	upcomingTasks: Record<string, any>[];
	completedTasks: Record<string, any>[];
	currentLocation: string;
}

export interface IActionInterface {
	type: string;
	payload?: {
		expiringTasks?: Record<string, any>[];
		upcomingTasks?: Record<string, any>[];
		completedTasks?: Record<string, any>[];
		currentLocation?: string;
	};
}

const InitialState: IStateInterface = {
	expiringTasks: [],
	upcomingTasks: [],
	completedTasks: [],
	currentLocation: '',
};

const DailyTasksReducer = (state, action): IStateInterface => {
	switch (action.type) {
		case 'ADD_TASKS':
			return {
				...state,
				expiringTasks: action.payload.expiringTasks,
				upcomingTasks: action.payload.upcomingTasks,
				completedTasks: action.payload.completedTasks,
			};
		case 'ADD_LOCATION':
			return {
				...state,
				currentLocation: action.payload.currentLocation,
			};
		case 'CLEAR_TASKS':
			return {
				...state,
				expiringTasks: [],
				upcomingTasks: [],
				completedTasks: [],
			};
		default:
			return state;
	}
};

export { DailyTasksReducer, InitialState };
