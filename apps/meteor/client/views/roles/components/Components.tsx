import React, { createElement, ReactElement } from 'react';

import BrokerRole from './BrokerRole';
import EmployeeRole from './EmployeeRole';
import EmployerRole from './EmployerRole';

const Components = {
	EmployerRoleFormCmp: EmployerRole,
	EmployeeRoleFormCmp: EmployeeRole,
	BrokerRoleFormCmp: BrokerRole,
};

// eslint-disable-next-line react/display-name
export default (block): ReactElement => {
	if (typeof Components[block.cmpClass] !== 'undefined') {
		return createElement(Components[block.cmpClass], {
			key: block.id,
			id: block.id,
			title: block.title,
			credits: block.userCredit,
			cmpConfig: block.cmpConfig,
			roleState: block.roleState,
			setRoleState: block.setRoleState,
		});
	}
	return createElement(() => <div>Component {block.id} was not created</div>, { key: block.id });
};
