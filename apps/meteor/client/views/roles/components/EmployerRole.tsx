import { Accordion, Box, RadioButton, Button } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { useContext, useState } from 'react';
import { DispatchPaymentResultContext } from '../../../contexts/PaymentResultContext/GlobalState';

import { useCapitalizeAndJoin } from '../../../hooks/useCapitalization';
import { dispatchToastMessage } from '../../../lib/toast';

type Props = {
	title?: string;
	id: string;
	cmpConfig: Record<string, any>;
	credits: number;
	roleState: number;
	setRoleState: Function;
	onToggle: (e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => void;
};

const EmployerRole = ({ title, id, cmpConfig, credits, roleState, setRoleState, onToggle }: Props) => {
	const [rank1, setRank1] = useState(false);
	const [rank2, setRank2] = useState(false);
	const [rank3, setRank3] = useState(false);
	const [rankAmount, setRankAmount] = useState(0);
	const t = useTranslation();
    const capitalize = useCapitalizeAndJoin()
	const { dispatch } = useContext(DispatchPaymentResultContext);

	const hanldeRadioButtonClick = (rank: string, amount: number): void => {
		setRankAmount(amount);
		if (rank === 'rank1') {
			setRank1(true);
			setRank2(false);
			setRank3(false);
		} else if (rank === 'rank2') {
			setRank1(false);
			setRank2(true);
			setRank3(false);
		} else {
			setRank1(false);
			setRank2(false);
			setRank3(true);
		}
	};

	const handleSubmit = () => {
		if (credits >= rankAmount) {
			Meteor.call('addEscrow', { amount: rankAmount, type: id }, (error, result) => {
				if (result) {
					console.log(result, 'result');
					setRoleState(roleState + 1);
					// @ts-ignore
					dispatchToastMessage({ type: 'success', message: t('gso_selectRoleView_successMessage') });
                    dispatch({
						type: 'ADD_RESULT_DETAILS',
						payload: { status: result.status, role: capitalize(result.type) },
					});
					FlowRouter.go('/role-result');
				}

				if (error) {
					setRoleState(roleState + 1);
					// @ts-ignore
					dispatchToastMessage({ type: 'error', message: error });
				}
			});
		} else {
			// @ts-ignore
			dispatchToastMessage({ type: 'error', message: t('gso_selectRoleView_errorMessage') });
		}
	};

	return (
		// @ts-ignore
		<Accordion.Item title={title} id={id} onToggle={onToggle}>
			<Box>
				{/* @ts-ignore */}
				<p style={{ fontSize: '15px', fontWeight: 'bold' }}>{t('gso_selectRoleView_employerRole_subtitle')}</p>
				<Box display='flex' style={{ marginTop: '20px' }}>
					<RadioButton checked={rank1} onClick={(): void => hanldeRadioButtonClick('rank1', 50)} onChange={(): void => {}} />
					<p style={{ fontSize: '14px', marginLeft: '9px' }}>{`Rank 1(${cmpConfig.rank1} Credit)`}</p>
				</Box>
				<Box display='flex' style={{ marginTop: '20px' }}>
					<RadioButton checked={rank2} onClick={(): void => hanldeRadioButtonClick('rank2', 100)} onChange={(): void => {}} />
					<p style={{ fontSize: '14px', marginLeft: '9px' }}>{`Rank 2(${cmpConfig.rank2} Credit)`}</p>
				</Box>
				<Box display='flex' style={{ marginTop: '20px' }}>
					<RadioButton checked={rank3} onClick={(): void => hanldeRadioButtonClick('rank3', 200)} onChange={(): void => {}} />
					<p style={{ fontSize: '14px', marginLeft: '9px' }}>{`Rank 3(${cmpConfig.rank3} Credit)`}</p>
				</Box>
				{/* @ts-ignore */}
				<p style={{ fontSize: '15px', fontWeight: 'bold', margin: '20px 0' }}>{t('gso_selectRoleView_employerRole_footer')}</p>
				<Button primary style={{ float: 'right' }} onClick={handleSubmit}>
				    {/* @ts-ignore */}
					{t('gso_selectRoleView_employerRole_submitBtn')}
				</Button>
			</Box>
		</Accordion.Item>
	);
};

export default EmployerRole;
