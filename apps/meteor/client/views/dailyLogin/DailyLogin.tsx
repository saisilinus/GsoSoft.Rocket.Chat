import { Modal, Banner, Box, Icon } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

import './daily-login.css';

type Props = {
	banner: boolean;
	setBanner: Function;
	closeModal: Function;
};

const DailyLogin = ({ banner, setBanner, closeModal }: Props): ReactElement => {
	return (
		<Box>
			{banner ? (
				<Banner
					inline
					closeable
					icon={<Icon name='user' size={24} />}
					title='Good morning ryann254!'
					variant='success'
					onClose={() => setBanner(false)}
				/>
			) : null}

			<Modal style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
				<Modal.Header>
					<Modal.Close id='close' onClick={() => closeModal(false)} />
				</Modal.Header>
				<Modal.Content>
					<Box display='flex' alignItems='center'>
						<div style={{ cursor: 'pointer' }}>
							<img src='images/icons/icons8-gift-100.png' alt='gift-image' />
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
							<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Day 4</span>
							<span>Here's your gift for today. Click it to receive it</span>
						</div>
					</Box>
				</Modal.Content>
				<Modal.Footer>
					<Box display='flex' justifyContent='space-around'>
						<div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
							<p style={{ fontWeight: 'bold' }}>Day 1</p>
							<img style={{ width: '50px' }} src='images/icons/icons8-check-all-50.png' alt='checked-image' />
						</div>
						<div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
							<p style={{ fontWeight: 'bold' }}>Day 2</p>
							<img style={{ width: '50px' }} src='images/icons/icons8-check-all-50.png' alt='checked-image' />
						</div>
						<div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
							<p style={{ fontWeight: 'bold' }}>Day 3</p>
							<img style={{ width: '50px' }} src='images/icons/icons8-check-all-50.png' alt='checked-image' />
						</div>
						<div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }} className='current'>
							<p style={{ fontWeight: 'bold' }}>Day 4</p>
							<img style={{ width: '50px' }} src='images/icons/icons8-gift-100.png' alt='checked-image' />
						</div>
					</Box>
				</Modal.Footer>
			</Modal>
		</Box>
	);
};

export default DailyLogin;
