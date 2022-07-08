export interface IStateInterface {
	city: string;
	district: string;
}

export interface IActionInterface {
	type: string;
	payload?: {
		city?: string;
		district?: string;
	};
}

const InitialState: IStateInterface = {
	city: '',
	district: '',
};

const AddressReducer = (state, action): IStateInterface => {
	switch (action.type) {
		case 'ADD_ADDRESS':
			return {
				...state,
				city: action.payload.city,
				district: action.payload.district,
			};
		case 'CLEAR_ADDRESS':
			return {
				...state,
				city: '',
				district: '',
			};

		default:
			return state;
	}
};

export { AddressReducer, InitialState };
