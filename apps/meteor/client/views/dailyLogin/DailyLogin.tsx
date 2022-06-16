import { Modal, Banner, Box, Icon, Flex } from '@rocket.chat/fuselage';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useEffect, useState } from 'react';
import CollectedItemsList from './components/CollectedItemsList';

import './daily-login.css';

type Props = {
	banner: boolean;
	setBanner: Function;
	closeModal: Function;
};

const DailyLogin = ({ banner, setBanner, closeModal }: Props): ReactElement => {
	const [days, setDays] = useState<number[]>([]);
	useEffect(() => {
		Meteor.call('setUserReward', (error, result) => {
			if (result) {
				console.log(result, 'result');
				let daysArray = [...Array(6)];
				setDays(daysArray);
			}
		});
	}, []);
	console.log(days);
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

			<Modal style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: '5' }}>
				<Modal.Header>
					<Modal.Close id='close' onClick={() => closeModal(false)} />
				</Modal.Header>
				<Modal.Content>
					<Box display='flex' alignItems='center'>
						<div style={{ cursor: 'pointer' }}>
							<img src='images/icons/icons8-gift-100.png' alt='gift-image' />
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
							<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Day {days.length}</span>
							<span>Here's your gift for today. Click it to receive it</span>
						</div>
					</Box>
				</Modal.Content>
				<Modal.Footer>
					<Box display='flex' justifyContent='space-around'>
						{days.length === 1
							? days.map((element, index) => (
									<div key={index} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
										<p style={{ fontWeight: 'bold' }}>Day {index + 1}</p>
										<img style={{ width: '50px' }} src='images/icons/icons8-gift-100.png' alt='gift-image' />
									</div>
							  ))
							: null}
						{days.length > 1 && days.length <= 4
							? days.slice(0, days.length - 1).map((element, index) => <CollectedItemsList index={index} days={days.length} />)
							: null}
						{days.length > 4
							? days.slice(days.length - 4, days.length - 1).map((element, index) => (
									<>
										<CollectedItemsList index={index + (days.length - 4)} days={days.length} />
									</>
							  ))
							: null}
					</Box>
				</Modal.Footer>
			</Modal>
		</Box>
	);
};

export default DailyLogin;
