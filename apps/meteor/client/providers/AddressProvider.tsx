import React, { ReactElement, useReducer } from 'react';

import { AddressReducer, InitialState } from '../contexts/AddressContext/AddressReducer';
import { DispatchAddressContext, AddressContext } from '../contexts/AddressContext/GlobalState';

const AddressProvider = ({ children }): ReactElement => {
	const [global, dispatch] = useReducer(AddressReducer, InitialState);
	return (
		<DispatchAddressContext.Provider value={{ dispatch }}>
			<AddressContext.Provider value={global}>{children}</AddressContext.Provider>
		</DispatchAddressContext.Provider>
	);
};

export default AddressProvider;
