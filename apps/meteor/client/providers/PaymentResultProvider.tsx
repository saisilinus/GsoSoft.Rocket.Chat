import React, { ReactElement, useReducer } from 'react';

import { DispatchPaymentResultContext, PaymentResultContext } from '../contexts/PaymentResultContext/GlobalState';
import { PaymentResultReducer, InitialState } from '../contexts/PaymentResultContext/PaymentResultReducer';

const PaymentResultProvider = ({ children }): ReactElement => {
	const [global, dispatch] = useReducer(PaymentResultReducer, InitialState);
	return (
		<DispatchPaymentResultContext.Provider value={{ dispatch }}>
			<PaymentResultContext.Provider value={global}>{children}</PaymentResultContext.Provider>
		</DispatchPaymentResultContext.Provider>
	);
};

export default PaymentResultProvider;
