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
    if (block.cmpClass === undefined || block.cmpClass === '') {
      return createElement(
        () => <Accordion><Accordion.Item title={block.capitalize(block.id)} disabled={true} /></Accordion>,
        { key: block.id }
      );
    } else {
      if (typeof Components[block.cmpClass] !== "undefined" && block.show === false) {
        return createElement(
        Components[block.cmpClass], {
          key: block.id,
          id: block.id,
          title: block.title,
          credits: block.userCredit,
          cmpConfig: block.cmpConfig,
          roleState: block.roleState,
          setRoleState: block.setRoleState,
          onToggle: block.onAccordionToggle
        });
      }
      // Hide the role if the show is true. 
      return createElement(
        () => <div></div>,
        { key: block.id }
      );
    }
  };