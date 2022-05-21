export interface IStateInterface {
	credit: number;
	gateway: string;
	status: string;
}

export interface IActionInterface {
	type: string;
	payload?: {
		credit: number;
		gateway: string;
		status: string;
	};
}

const InitialState: IStateInterface = {
	credit: 0,
	gateway: '',
	status: '',
};

const PaymentResultReducer = (state, action): IStateInterface => {
	switch (action.type) {
		case 'ADD_RESULT_DETAILS':
			return {
				...state,
				credit: action.payload.credit,
				gateway: action.payload.gateway,
				status: action.payload.status,
			};
		case 'REMOVE_RESULT_DETAILS':
			return {
				...state,
				credit: 0,
				gateway: '',
				status: '',
			};
		default:
			return state;
	}
};

export { PaymentResultReducer, InitialState };
