import { Box, Icon } from '@rocket.chat/fuselage';
import React from 'react';

import { useCapitalizeAndJoin } from '../../../hooks/useCapitalization';
import { useFormatDate } from '../../../hooks/useFormatDate';

type Props = {
	gateway: string;
	amount: number;
	quantity: number;
	currency: string;
};

const PaymentModule = ({ gateway, amount, quantity, currency }: Props) => {
	const capitalize = useCapitalizeAndJoin();
	const formatDate = useFormatDate();

	const handleModal = (): void => {};
	return (
		<Box style={{ marginTop: '20px' }}>
			<span>{formatDate(new Date().getDate())}</span>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				style={{ fontWeight: 'bold', background: '#ddd', height: '50px', marginTop: '8px' }}
			>
				<span style={{ marginLeft: '10px' }}>{`${capitalize(gateway)}: ${amount} ${capitalize(currency)} - ${quantity} points`}</span>
				<Icon onClick={handleModal} style={{ marginRight: '10px' }} name='info' fontSize='32px' />
			</Box>
		</Box>
	);
};

export default PaymentModule;
