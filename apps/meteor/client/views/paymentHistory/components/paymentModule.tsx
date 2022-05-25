import { Box, Icon } from '@rocket.chat/fuselage';
import React from 'react';

import { useCapitalizeAndJoin } from '../../../hooks/useCapitalization';
import { useFormatDate } from '../../../hooks/useFormatDate';

type Props = {
	gateway: string;
	amount: number;
	quantity: number;
	currency: string;
	date: Date;
	openModal: React.MouseEventHandler<HTMLElement>;
};

const PaymentModule = ({ gateway, amount, quantity, currency, openModal, date }: Props) => {
	const capitalize = useCapitalizeAndJoin();
	const formatDate = useFormatDate();
	return (
		<Box style={{ marginTop: '20px' }}>
			<span>{formatDate(date)}</span>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				style={{ fontWeight: 'bold', background: '#ddd', height: '50px', marginTop: '8px' }}
			>
				<span style={{ marginLeft: '10px' }}>{`${capitalize(gateway)}: ${amount} ${capitalize(currency)} - ${quantity} points`}</span>
				<Icon onClick={openModal} style={{ marginRight: '10px', cursor: 'pointer' }} name='info' fontSize='32px' />
			</Box>
		</Box>
	);
};

export default PaymentModule;
