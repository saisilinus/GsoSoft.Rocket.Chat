/* eslint-disable react/no-multi-comp */
import { Tile, Box, Icon, Tooltip } from '@rocket.chat/fuselage';
import React, { ReactElement } from 'react';

import '../instagramCloneCss.css';

interface ICommentProps {
	author: string;
	content: string;
}

const Comment = ({ author, content }: ICommentProps): ReactElement => (
	<>
		<span style={{ fontWeight: 'bold' }}>{author}</span> {content.length > 55 ? `${content.slice(0, 55)}...` : content}
	</>
);

const InstagramPost = (): ReactElement => {
	const showToolTip = (item: string): void => {
		const element = document.querySelector(`#${item}`);
		if (element) {
			if (element.classList.contains('invisible')) {
				element.classList.remove('invisible');
				element.classList.add('visible');
			} else {
				element.classList.remove('visible');
				element.classList.add('invisible');
			}
		}
	};
	return (
		<Tile id='post' style={{ maxWidth: '473px' }}>
			<Box display='flex' justifyContent='space-between' alignItems='center' style={{ padding: '1rem' }}>
				<Box display='flex' alignItems='center'>
					<Box style={{ border: '3px solid #ff3041', borderRadius: '100%', height: '55px', width: '55px' }}>
						<img
							src='/images/blog_images/Kimetsu_no_yaiba_1.jpg'
							alt='profile image'
							style={{ width: '50px', height: '50px', borderRadius: '100%' }}
						/>
					</Box>
					<p style={{ fontWeight: 'bold', marginLeft: '8px' }}>Tanjiro Kamado</p>
				</Box>
				<Tooltip id='info' style={{ backgroundColor: 'whitesmoke' }} className='invisible' placement='left'>
					<p style={{ cursor: 'pointer', marginBottom: '8px' }}>Update</p>
					<p style={{ cursor: 'pointer', marginBottom: '8px' }}>Share</p>
					<p style={{ color: '#ff3041', cursor: 'pointer' }}>Delete</p>
				</Tooltip>
				<Icon onClick={(): void => showToolTip('info')} mie='x4' name='meatballs' size='x20' style={{ cursor: 'pointer' }} />
			</Box>
			<Box>
				<img
					src='/images/blog_images/Kimetsu_no_yaiba_1.jpg'
					alt='profile image'
					style={{ maxWidth: '473px', height: '373px', width: '100%' }}
				/>
			</Box>
			<Box style={{ padding: '10px 16px' }}>
				<Icon mie='x4' name='check' size='x28' style={{ marginLeft: '8px' }} />
				<Icon mie='x4' name='balloon' size='x28' style={{ marginLeft: '8px' }} />
				<Icon mie='x4' name='send-active' size='x28' style={{ marginLeft: '8px' }} />
				<p style={{ fontWeight: 'bold', paddingTop: '10px' }}>100,957 views</p>
				<p style={{ paddingTop: '10px' }}>
					<Comment
						author='Tanjiro Kamado'
						content="He's a fictional character and the main protagonist in Koyoharu Gotouge's manga Demon Slayer: Kimetsu no Yaiba."
					/>
				</p>
				<Box style={{ paddingTop: '10px' }}>
					<p style={{ color: 'rgb(142, 142, 142)' }}>View all 2 comments</p>
					<Box display='flex' flexDirection='column'>
						<Comment author='Nezuko Kamado' content="He's a good brother who's very dedicated and strong" />
					</Box>
				</Box>
				<p style={{ paddingTop: '10px', color: 'rgb(142, 142, 142)' }}>4 HOURS AGO</p>
			</Box>
		</Tile>
	);
};

export default InstagramPost;
