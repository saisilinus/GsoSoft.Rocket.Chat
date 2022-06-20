export interface IStateInterface {
	credit: number;
	gateway: string;
	status: string;
	role: string;
}

export interface IActionInterface {
	type: string;
	payload?: {
		credit?: number;
		gateway?: string;
		status?: string;
		role?: string;
	};
}

const InitialState: IStateInterface = {
	credit: 0,
	gateway: '',
	status: '',
	role: '',
};

const PaymentResultReducer = (state, action): IStateInterface => {
	switch (action.type) {
		case 'ADD_RESULT_DETAILS':
			return {
				...state,
				credit: action.payload.credit,
				gateway: action.payload.gateway,
				status: action.payload.status,
				role: action.payload.role,
			};
		case 'REMOVE_RESULT_DETAILS':
			return {
				...state,
				credit: 0,
				gateway: '',
				status: '',
				role: '',
			};
		default:
			return state;
	}
};

export { PaymentResultReducer, InitialState };
