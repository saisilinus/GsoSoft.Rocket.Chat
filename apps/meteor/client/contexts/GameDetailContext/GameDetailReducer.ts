export interface IGameStateInterface {
	value: { id: string; title: string; description: string };
}

export interface IGameActionInterface {
	type: string;
	payload?: {
		id: string;
		title: string;
		description: string;
	};
}

const InitialState: IGameStateInterface = {
	value: { id: '', title: '', description: '' },
};

const GameDetailReducer = (state, action): IGameStateInterface => {
	switch (action.type) {
		case 'ADD_DETAILS':
			return {
				...state,
				value: action.payload,
			};
		case 'CLEAR_DETAILS':
			return {
				...state,
				value: { id: '', title: '', description: '' },
			};
		default:
			return state;
	}
};

export { GameDetailReducer, InitialState };
