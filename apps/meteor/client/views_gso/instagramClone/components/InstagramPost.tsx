/* eslint-disable react/no-multi-comp */
import { Tile, Box, Icon, Tooltip } from '@rocket.chat/fuselage';
import sha256 from 'crypto-js/sha256';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import '../instagramCloneCss.css';

interface ICommentProps {
	author: string;
	content: string;
}

type Props = {
	username: string;
	postId: string;
	images: Record<string, any>[];
	likes: number;
	caption: string;
	setCreatedPost: Function;
	type: string;
};

const Comment = ({ author, content }: ICommentProps): ReactElement => (
	<>
		<span style={{ fontWeight: 'bold' }}>{author}</span> {content.length > 55 ? `${content.slice(0, 55)}...` : content}
	</>
);

const InstagramPost = ({ username, postId, images, likes, caption, setCreatedPost, type }: Props): ReactElement => {
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
	const deletePost = (postId: string): void => {
		Meteor.call('deleteMediaPost', postId, (error, result) => {
			if (result) {
				console.log(result);
				// This is mean to refresh the ui and trigger fetching the new list of posts from the backend
				setCreatedPost(true);
			}

			if (error) {
				console.error(error);
			}
		});
	};

	const deletePostFromCloudinary = (images: Record<string, any>[], postId: string): void => {
		showToolTip(postId);
		const deleteUrl = `https://api.cloudinary.com/v1_1/${Meteor.settings.public.cloudinary.name}/${type}/destroy`;
		images.forEach(async (fileData, index) => {
			const formData = new FormData();
			const timestamp = new Date().getTime();
			formData.append('public_id', fileData.id);
			formData.append('api_key', Meteor.settings.public.cloudinary.APIKey);
			formData.append('timestamp', `${timestamp}`);
			formData.append(
				'signature',
				sha256(`public_id=${fileData.id}&timestamp=${timestamp}${Meteor.settings.public.cloudinary.APISecret}`).toString(),
			);
			try {
				const response = await fetch(deleteUrl, { method: 'POST', body: formData });
				const data = await response.json();

				if (index === images.length - 1 && data.result === 'ok') {
					deletePost(postId);
				}
			} catch (error) {
				console.error(error);
			}
		});
	};
	return (
		<Tile id='post' style={{ maxWidth: '473px' }}>
			<Box display='flex' justifyContent='space-between' alignItems='center' style={{ padding: '1rem' }}>
				<Box display='flex' alignItems='center'>
					<Box style={{ border: '3px solid #ff3041', borderRadius: '100%', height: '55px', width: '55px' }}>
						<img
							src={type === 'image' ? images[0].url : 'https://source.unsplash.com/2l0CWTpcChI/300x300/'}
							alt='profile image'
							style={{ width: '50px', height: '50px', borderRadius: '100%' }}
						/>
					</Box>
					<p style={{ fontWeight: 'bold', marginLeft: '8px' }}>{username}</p>
				</Box>
				<Tooltip id={postId} style={{ backgroundColor: 'whitesmoke', pointerEvents: 'all' }} className='invisible' placement='left'>
					{Meteor.user()?.username === username ? (
						<>
							<p style={{ cursor: 'pointer', marginBottom: '8px' }}>Update</p>
							<p
								style={{ color: '#ff3041', marginBottom: '8px', cursor: 'pointer' }}
								onClick={(): void => deletePostFromCloudinary(images, postId)}
							>
								Delete
							</p>
						</>
					) : null}
					<p style={{ cursor: 'pointer', marginBottom: '8px' }}>Share</p>
				</Tooltip>
				<Icon onClick={(): void => showToolTip(postId)} mie='x4' name='meatballs' size='x20' style={{ cursor: 'pointer' }} />
			</Box>
			<Box>
				{type === 'image' ? (
					<Swiper pagination={true} modules={[Pagination]} className='mySwiper'>
						{images.map((img, index) => (
							<SwiperSlide key={index}>
								<img
									src={img.url}
									alt='profile image'
									style={{ maxWidth: '473px', height: '373px', width: '100%', marginBottom: '40px' }}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<video controls width='100%'>
						<source src={images[0].url} type='video/mp4' />
						Sorry, your browser doesn't support embedded videos.
					</video>
				)}
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
