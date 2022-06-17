import { Box, Tile } from '@rocket.chat/fuselage';
import React from 'react';

type Props = {
	setModal: Function;
	setGift: Function;
	title: string;
	content: string[];
};

const TaskTab = ({ setGift, setModal, title, content }: Props) => {
	return (
		<>
			<Tile style={{ background: 'rgba(47, 52, 61, 0.1)' }}>{title}</Tile>
			{content.map((item, index) => (
				<Tile key={index}>
					<Box display='flex' justifyContent='space-between' alignItems='center'>
						<span style={{ fontSize: '16px' }}>{item}</span>
						<div style={{ display: 'flex' }}>
							<img
								onClick={() => {
									setModal(true), setGift(true);
								}}
								style={{ width: '35px', height: '35px', marginRight: '8px', cursor: 'pointer' }}
								src='images/icons/icons8-gift-100.png'
								alt='gift-image'
							/>
							<img
								onClick={() => {
									setModal(true), setGift(false);
								}}
								style={{ width: '35px', height: '35px', cursor: 'pointer' }}
								src='images/icons/icons8-question-mark-64.png'
								alt='question-mark-image'
							/>
						</div>
					</Box>
				</Tile>
			))}
		</>
	);
};

export default TaskTab;
