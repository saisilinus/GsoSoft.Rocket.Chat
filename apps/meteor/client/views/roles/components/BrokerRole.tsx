import { Accordion, Box, Button } from '@rocket.chat/fuselage'
import { useTranslation } from '@rocket.chat/ui-contexts';
import { Meteor } from 'meteor/meteor'
import React from 'react'

import {dispatchToastMessage} from '../../../lib/toast'


type Props = {
	title?: string;
	id: string;
  cmpConfig: Record<string, any>
  credits: number
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
};

const BrokerRole = ({ title, id, cmpConfig, credits, onToggle }: Props) => {
    const t = useTranslation()

    const handleSubmit = () => {
      if (credits >= cmpConfig.escrow) {
        Meteor.call('addEscrow', {amount: cmpConfig.escrow, type: id}, (error, result) => {
          if (result) {
          // @ts-ignore
          dispatchToastMessage({type: 'success', message: t('gso_selectRoleView_successMessage')})
          }

          if (error) {
            // @ts-ignore
            dispatchToastMessage({type: 'error', message: error})
          }
        })
        
      } else {
        // @ts-ignore
        dispatchToastMessage({type: 'error', message: t('gso_selectRoleView_errorMessage')})
      }
    }
  return (
    // @ts-ignore
	<Accordion.Item title={title} id={id} onToggle={onToggle}>
        <Box>
            <p style={{fontSize: '15px', fontWeight: 'bold'}}>{`Please escrow ${cmpConfig.escrow} credits to secure the role`}</p>
            {/* @ts-ignore */}
            <p style={{fontSize: '14px', color: "#808080", marginTop: '10px'}}>{t('gso_selectRoleView_brokerRole_subtitle')}</p>

            <p style={{fontSize: '14px', color: "#808080", marginTop: '10px'}}>{`After you submit, ${cmpConfig.escrow} credits will be deducted from your fund`}</p>

            {/* @ts-ignore */}
            <p style={{fontSize: '15px', fontWeight: 'bold', margin: '20px 0'}}>{t('gso_selectRoleView_brokerRole_footer')}</p>

            {/* @ts-ignore */}
            <Button primary style={{float: 'right', marginTop: '20px'}} onClick={handleSubmit}>{t('gso_selectRoleView_brokerRole_submitBtn')}</Button>
        </Box>
    </Accordion.Item>
  )
}

export default BrokerRole