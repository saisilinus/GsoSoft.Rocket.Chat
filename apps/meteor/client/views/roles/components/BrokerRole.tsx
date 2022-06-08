import { Accordion, Box, RadioButton, Button } from '@rocket.chat/fuselage'
import React, { useState } from 'react'

type Props = {
	title?: string;
	id: string;
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
};

const BrokerRole = ({ title, id, onToggle }: Props) => {

  return (
    // @ts-ignore
	<Accordion.Item title={title} id={id} onToggle={onToggle}>
        <Box>
            <p style={{fontSize: '15px', fontWeight: 'bold'}}>Please escrow 50 credits to secure the role</p>
            <p style={{fontSize: '14px', color: "#808080", marginTop: '10px'}}>Your escrow will be returned to you. You can start posting profile but the ranking of your post is low until your request is approved.</p>

            <p style={{fontSize: '14px', color: "#808080", marginTop: '10px'}}>After you submit, 50 credits will be deducted from your fund</p>
            
            <p style={{fontSize: '15px', fontWeight: 'bold', margin: '20px 0'}}>Your fund is currently 100</p>
            <Button primary style={{float: 'right', marginTop: '20px'}}>I agree</Button>
        </Box>
    </Accordion.Item>
  )
}

export default BrokerRole