import { createContext, Dispatch as ReactDispatch } from 'react';

import { InitialState, IActionInterface } from './AddressReducer';

export const AddressContext = createContext(InitialState);

export const DispatchAddressContext = createContext<{ dispatch: ReactDispatch<IActionInterface | string> }>({
	dispatch: () => undefined,
});
