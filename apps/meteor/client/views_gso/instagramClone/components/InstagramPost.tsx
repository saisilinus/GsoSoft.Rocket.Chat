/* eslint-disable react/no-multi-comp */
import { Tile, Box, Icon, Tooltip } from '@rocket.chat/fuselage';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement } from 'react';

import '../instagramCloneCss.css';

interface ICommentProps {
	author: string;
	content: string;
}

type Props = {
	username: string;
	postId: string;
	images: string[];
	likes: number;
	caption: string;
};

const Comment = ({ author, content }: ICommentProps): ReactElement => (
	<>
		<span style={{ fontWeight: 'bold' }}>{author}</span> {content.length > 55 ? `${content.slice(0, 55)}...` : content}
	</>
);

const InstagramPost = ({ username, postId, images, likes, caption }: Props): ReactElement => {
	const showToolTip = (item: string): void => {
		const element = document.getElementById(item);
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
						<img src={images[0]} alt='profile image' style={{ width: '50px', height: '50px', borderRadius: '100%' }} />
					</Box>
					<p style={{ fontWeight: 'bold', marginLeft: '8px' }}>{username}</p>
				</Box>
				<Tooltip id={postId} style={{ backgroundColor: 'whitesmoke' }} className='invisible' placement='left'>
					{Meteor.user()?.username === username ? (
						<>
							<p style={{ cursor: 'pointer', marginBottom: '8px' }}>Update</p>
							<p style={{ color: '#ff3041', cursor: 'pointer' }}>Delete</p>
						</>
					) : null}
					<p style={{ cursor: 'pointer', marginBottom: '8px' }}>Share</p>
				</Tooltip>
				<Icon onClick={(): void => showToolTip(postId)} mie='x4' name='meatballs' size='x20' style={{ cursor: 'pointer' }} />
			</Box>
			<Box>
				<img src={images[0]} alt='profile image' style={{ maxWidth: '473px', height: '373px', width: '100%' }} />
			</Box>
			<Box style={{ padding: '10px 16px' }}>
				<Icon mie='x4' name='check' size='x28' style={{ marginLeft: '8px' }} />
				<Icon mie='x4' name='balloon' size='x28' style={{ marginLeft: '8px' }} />
				<Icon mie='x4' name='send-active' size='x28' style={{ marginLeft: '8px' }} />
				<p style={{ fontWeight: 'bold', paddingTop: '10px' }}>{likes} views</p>
				<p style={{ paddingTop: '10px' }}>
					<Comment author={username} content={caption} />
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
