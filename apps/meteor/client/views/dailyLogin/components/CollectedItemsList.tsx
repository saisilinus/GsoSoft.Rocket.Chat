import React from 'react';

type Props = {
	index: number;
	days: number;
};

const CollectedItemsList = ({ index, days }: Props) => {
	return (
		<>
			<div key={index} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
				<p style={{ fontWeight: 'bold' }}>Day {index + 1}</p>
				<img style={{ width: '50px' }} src='images/icons/icons8-check-all-50.png' alt='gift-image' />
			</div>
			{index === days - 2 ? (
				<div key={index} className='current' style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
					<p style={{ fontWeight: 'bold' }}>Day {index + 2}</p>
					<img style={{ width: '50px' }} src='images/icons/icons8-gift-100.png' alt='gift-image' />
				</div>
			) : null}
		</>
	);
};

export default CollectedItemsList;
