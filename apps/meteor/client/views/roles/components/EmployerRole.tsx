import { Accordion, Box, RadioButton, Button } from '@rocket.chat/fuselage'
import React, { useState } from 'react'

type Props = {
	title?: string;
	id: string;
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
};

const EmployerRole = ({ title, id, onToggle }: Props) => {
    const [rank1, setRank1] = useState(false)
    const [rank2, setRank2] = useState(false)
    const [rank3, setRank3] = useState(false)

    const hanldeRadioButtonClick = (rank:string): void => {
        if (rank === 'rank1') {
            setRank1(true)
            setRank2(false)
            setRank3(false)
        } else if (rank === 'rank2') {
            setRank1(false)
            setRank2(true)
            setRank3(false)
        } else {
            setRank1(false)
            setRank2(false)
            setRank3(true)
        }
    }

  return (
    // @ts-ignore
	<Accordion.Item title={title} id={id} onToggle={onToggle}>
        <Box>
            <p style={{fontSize: '15px', fontWeight: 'bold'}}>Escrow needed. The higher the escrow the higher the rank</p>
            <Box display='flex' style={{marginTop: '20px'}}>
                <RadioButton checked={rank1} onClick={() => hanldeRadioButtonClick('rank1')} />
                <p style={{fontSize: '14px', marginLeft: '9px'}}>Rank 1(50 Credit)</p>
            </Box>
            <Box display='flex' style={{marginTop: '20px'}}>
                <RadioButton checked={rank2} onClick={() => hanldeRadioButtonClick('rank2')} />
                <p style={{fontSize: '14px', marginLeft: '9px'}}>Rank 2(100 Credit)</p>
            </Box>
            <Box display='flex' style={{marginTop: '20px'}}>
                <RadioButton checked={rank3} onClick={() => hanldeRadioButtonClick('rank3')} />
                <p style={{fontSize: '14px', marginLeft: '9px'}}>Rank 3(200 Credit)</p>
            </Box>
            <p style={{fontSize: '15px', fontWeight: 'bold', margin: '20px 0'}}>Your fund is currently 100</p>
            <Button primary style={{float: 'right'}}>Continue</Button>
        </Box>
    </Accordion.Item>
  )
}

export default EmployerRole