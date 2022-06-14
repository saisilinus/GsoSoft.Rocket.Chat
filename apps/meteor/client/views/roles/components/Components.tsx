import { Accordion } from '@rocket.chat/fuselage';
import React, {createElement} from 'react'

import BrokerRole from "./BrokerRole";
import EmployerRole from "./EmployerRole";
import EmployeeRole from "./EmployeeRole";

const Components = {
    EmployerRoleFormCmp: EmployerRole,
    EmployeeRoleFormCmp: EmployeeRole,
    BrokerRoleFormCmp: BrokerRole,
}

export default block => {
      if (typeof Components[block.cmpClass] !== "undefined") {
        return createElement(
        Components[block.cmpClass], {
          key: block.id,
          id: block.id,
          title: block.title,
          credits: block.userCredit,
          cmpConfig: block.cmpConfig,
          roleState: block.roleState,
          setRoleState: block.setRoleState,
        });
      }
      return createElement(
        () => <div>Component {block.id} was not created</div>,
        { key: block.id }
      );
  };