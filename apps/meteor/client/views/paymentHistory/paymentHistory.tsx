import { Box, Button, Icon, InputBox, Select } from '@rocket.chat/fuselage';
import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { useFormatDate } from '../../hooks/useFormatDate';

const PaymentHistory = () => {
	const [_statusSelect, setStatusSelect] = useState('');
	const formatDate = useFormatDate();
	// const currentDate = new Date().getUTCDate();
	// const addDays = (days: number) => new Date(new Date().setDate(currentDate + days));
	// useEffect(() => {

	// }, []);
	return (
		<Page>
			<Icon name='chevron-right' fontSize='32px' />
			<Page.Header title='Purchase history' />
			<Page.Content>
				<Box display='flex' justifyContent='space-between'>
					<Box>
						<span>Range: </span>
						<InputBox type='text' defaultValue={formatDate(new Date().getDate())} onChange={function noRefCheck() {}} />
					</Box>
					<Box>
						<span>Status: </span>
						<Select
							onChange={(e: any) => setStatusSelect(e)}
							options={[
								['success', 'Success'],
								['fail', 'Fail'],
							]}
							placeholder='Success/Fail'
						/>
					</Box>
				</Box>
				<Box style={{ marginTop: '20px' }}>
					<span>{formatDate(new Date().getDate())}</span>
					<Box display='flex' alignItems='center' style={{ fontWeight: 'bold', background: '#ddd', height: '50px', marginTop: '8px' }}>
						<span style={{ marginLeft: '10px' }}>Paypal: 160 USD - 11 points</span>
					</Box>
				</Box>
				<Box width='full' display='flex' justifyContent='center'>
					<Button primary style={{ position: 'absolute', bottom: '50px', float: 'right' }}>
						Load More..
					</Button>
				</Box>
			</Page.Content>
		</Page>
	);
};

export default PaymentHistory;
