import { createContext, Dispatch as ReactDispatch } from 'react';

import { InitialState, IActionInterface } from './PaymentResultReducer';

export const PaymentResultContext = createContext(InitialState);

export const DispatchPaymentResultContext = createContext<{ dispatch: ReactDispatch<IActionInterface> }>({
	dispatch: () => undefined,
});
