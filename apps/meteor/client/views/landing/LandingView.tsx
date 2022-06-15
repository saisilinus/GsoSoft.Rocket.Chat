import { useUser } from '@rocket.chat/ui-contexts';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';

import BottomBar from '../../components/BottomBar';
import Page from '../../components/Page';
import { useEndpointData } from '../../hooks/useEndpointData';
import TopBar from '../../topbar/TopBar';
import SingleBlogPost from '../blog/SingleBlogPost';
import DailyLogin from '../dailyLogin/DailyLogin';

const LandingView = (): ReactElement => {
	const [blogResults, setBlogResults] = useState([]);
	const [modal, setModal] = useState(false);
	const [banner, setBanner] = useState(false);

	useEffect(() => {
		if (!blogResults.length)
			Meteor.call('getBlogs', 10, (error, result) => {
				// TODO: Add a success and error messages
				if (result) {
					setBlogResults(result);
				} else {
					console.log(error, 'error');
				}
			});
	}, []);

	// TODO: Set it so that this function is called when a user collects the reward
	const setUserReward = () => {
		Meteor.call('setUserReward');
		console.log('here');
	};

	const closeModal = (state: boolean) => {
		setModal(false);
		setUserReward();
	};

	const user = useUser();
	// @ts-ignore
	const { username } = user;

	const { value: data } = useEndpointData(
		// @ts-ignore
		`/v1/users.info`,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		useMemo(() => ({ ...(username && { username }) }), [username]),
	);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _setUserData = useMemo(() => {
		if (data) {
			// @ts-ignore
			const { user } = data;
			console.log(user, 'user');
			if (user.consecutiveLogins === 1) {
				setModal(false);
				setBanner(false);
			} else {
				setModal(true);
				setBanner(true);
			}
		}
	}, [data]);
	return (
		<Page flexDirection='row'>
			<Page>
				<TopBar location='home' />
				<h3 style={{ marginLeft: '20px', marginTop: '10px', fontSize: '20px' }}>Top 10 Blog Posts</h3>
				{modal ? <DailyLogin banner={banner} setBanner={setBanner} closeModal={closeModal} /> : null}
				<Page.Content>{blogResults.length && blogResults.map((result, index) => <SingleBlogPost key={index} {...result} />)}</Page.Content>
				{isMobile ? <BottomBar /> : null}
			</Page>
		</Page>
	);
};

export default LandingView;
