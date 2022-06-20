import { Icon } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

type Props = {
	index: number;
	days: number;
};

const CollectedItemsList = ({ index, days }: Props): ReactElement => (
	<>
		<div key={index} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
			<p style={{ fontWeight: 'bold' }}>Day {index + 1}</p>
			<Icon name='circle-check' style={{ cursor: 'pointer' }} size='x50' />
		</div>
		{index === days - 2 ? (
			<div key={index} className='current' style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
				<p style={{ fontWeight: 'bold' }}>Day {index + 2}</p>
				<Icon name='arrow-down-box' style={{ cursor: 'pointer' }} size='x50' />
			</div>
		) : null}
	</>
);

export default CollectedItemsList;
