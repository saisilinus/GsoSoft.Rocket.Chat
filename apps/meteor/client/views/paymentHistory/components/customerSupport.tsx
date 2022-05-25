import { ButtonGroup, Modal, Button } from '@rocket.chat/fuselage';
import React from 'react';

type Props = {
	closeModal: React.MouseEventHandler<HTMLElement>;
};

const CustomerSupport = ({ closeModal }: Props) => {
	return (
		<Modal>
			<Modal.Header>
				<Modal.Icon name='headset' />
				<Modal.Title>Customer support</Modal.Title>
				<Modal.Close onClick={closeModal} />
			</Modal.Header>
			<Modal.Content>Do you need customer support?</Modal.Content>
			<Modal.Footer>
				<ButtonGroup align='center'>
					<Button danger onClick={closeModal}>
						No
					</Button>
					<Button primary onClick={closeModal}>
						Yes
					</Button>
				</ButtonGroup>
			</Modal.Footer>
		</Modal>
	);
};

export default CustomerSupport;
