import { Accordion, Box, RadioButton, Button } from '@rocket.chat/fuselage'
import { useTranslation } from '@rocket.chat/ui-contexts';
import React, { useState } from 'react'

type Props = {
	title?: string;
	id: string;
    cmpConfig: Record<string, any>
    credits: number
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
};

const EmployerRole = ({ title, id, cmpConfig, onToggle }: Props) => {
    const [rank1, setRank1] = useState(false)
    const [rank2, setRank2] = useState(false)
    const [rank3, setRank3] = useState(false)
    const t = useTranslation()

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
            {/* @ts-ignore */}
            <p style={{fontSize: '15px', fontWeight: 'bold'}}>{t('gso_selectRoleView_employerRole_subtitle')}</p>
            <Box display='flex' style={{marginTop: '20px'}}>
                <RadioButton checked={rank1} onClick={() => hanldeRadioButtonClick('rank1')} onChange={() => {}} />
                <p style={{fontSize: '14px', marginLeft: '9px'}}>{`Rank 1(${cmpConfig.rank1} Credit)`}</p>
            </Box>
            <Box display='flex' style={{marginTop: '20px'}}>
                <RadioButton checked={rank2} onClick={() => hanldeRadioButtonClick('rank2')} onChange={() => {}} />
                <p style={{fontSize: '14px', marginLeft: '9px'}}>{`Rank 2(${cmpConfig.rank2} Credit)`}</p>
            </Box>
            <Box display='flex' style={{marginTop: '20px'}}>
                <RadioButton checked={rank3} onClick={() => hanldeRadioButtonClick('rank3')} onChange={() => {}} />
                <p style={{fontSize: '14px', marginLeft: '9px'}}>{`Rank 3(${cmpConfig.rank3} Credit)`}</p>
            </Box>
            {/* @ts-ignore */}
            <p style={{fontSize: '15px', fontWeight: 'bold', margin: '20px 0'}}>{t('gso_selectRoleView_employerRole_footer')}</p>
            {/* @ts-ignore */}
            <Button primary style={{float: 'right'}}>{t('gso_selectRoleView_employerRole_submitBtn')}</Button>
        </Box>
    </Accordion.Item>
  )
}

export default EmployerRole