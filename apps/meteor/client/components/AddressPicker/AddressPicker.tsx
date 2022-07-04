import { Accordion, Box, CheckBox } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

const AddressPicker = (): ReactElement => {
	return (
		<Accordion style={{ margin: '15px 0' }}>
			<Accordion.Item title='Choose your city' defaultExpanded>
				<Box display='flex'>
					<CheckBox onClick={(): void => {}} />
					<p style={{ marginLeft: '8px' }}>Nairobi</p>
				</Box>
			</Accordion.Item>
		</Accordion>
	);
};

export default AddressPicker;
