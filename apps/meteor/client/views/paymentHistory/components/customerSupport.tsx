import { ButtonGroup, Modal, Button } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

type Props = {
	closeModal: React.MouseEventHandler<HTMLElement>;
	directChatRoute: React.MouseEventHandler<HTMLElement>;
	loading: boolean;
};

const CustomerSupport = ({ closeModal, directChatRoute, loading }: Props): ReactElement => (
	<Modal>
		<Modal.Header>
			<Modal.Icon name='headset' />
			<Modal.Title>Customer support</Modal.Title>
			<Modal.Close onClick={closeModal} />
		</Modal.Header>
		<Modal.Content>Do you need customer support?</Modal.Content>
		<Modal.Footer>
			<ButtonGroup align='center'>
				<Button danger disabled={loading} onClick={closeModal}>
					No
				</Button>
				<Button primary disabled={loading} onClick={directChatRoute}>
					Yes
				</Button>
			</ButtonGroup>
		</Modal.Footer>
	</Modal>
);

export default CustomerSupport;
