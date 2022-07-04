import { Accordion, Box, CheckBox } from '@rocket.chat/fuselage';
import React, { ReactElement, ReactNode } from 'react';

import Page from '../Page';
import ProfileHeader from '../ProfileHeader/ProfileHeader';

type Props = {
	title: string;
	id: string;
	handleRouteBack: Function;
	children: ReactNode;
};

const AddressPicker = ({ title, id, handleRouteBack, children }: Props): ReactElement => {
	return (
		<Page id={id}>
			{/* @ts-ignore */}
			<ProfileHeader title={title} handleRouteBack={handleRouteBack} />
			<Page.ScrollableContentWithShadow>
				<Accordion style={{ margin: '15px 0' }}>
					<Accordion.Item title='Choose your city' defaultExpanded>
						<Box display='flex'>
							<CheckBox onClick={(): void => {}} />
							<p style={{ marginLeft: '8px' }}>Nairobi</p>
						</Box>
					</Accordion.Item>
					{children}
					<Accordion.Item title='Choose your district' defaultExpanded>
						<Box display='flex'>
							<CheckBox onClick={(): void => {}} />
							<p style={{ marginLeft: '8px' }}>Kasarani</p>
						</Box>
					</Accordion.Item>
				</Accordion>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default AddressPicker;
