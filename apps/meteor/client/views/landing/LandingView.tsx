import { useUser } from '@rocket.chat/ui-contexts';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';

import BottomBar from '../../components/BottomBar';
import Page from '../../components/Page';
import { DailyTasksContext } from '../../contexts/DailyTasksContext/GlobalState';
import { useEndpointData } from '../../hooks/useEndpointData';
import TopBar from '../../topbar/TopBar';
import SingleBlogPost from '../blog/SingleBlogPost';
import DailyLogin from '../dailyLogin/DailyLogin';

const LandingView = (): ReactElement => {
	const [blogResults, setBlogResults] = useState([]);
	const [modal, setModal] = useState(false);
	const [banner, setBanner] = useState(false);
	const { currentLocation } = useContext(DailyTasksContext);
	console.log(currentLocation);

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
	}, [blogResults.length]);

	const closeModal = (): void => {
		setModal(false);
	};

	const user = useUser();
	if (user) {
		// @ts-ignore
		const { username } = user;
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { value: data } = useEndpointData(
			// @ts-ignore
			`/v1/users.info`,
			// eslint-disable-next-line
			useMemo(() => ({ ...(username && { username }) }), [username]),
		);

		// eslint-disable-next-line
		const _setUserData = useMemo(() => {
			if (data) {
				// @ts-ignore
				const { user } = data;
				const date = new Date(user.lastLogin ?? '01/01/2021');
				const daysBetweenLogins = new Date().getDate() - date.getDate();
				if (daysBetweenLogins >= 1) {
					setModal(true);
					setBanner(true);
				} else if (daysBetweenLogins < 1) {
					setModal(false);
					setBanner(false);
				}
			}
		}, [data]);
	}
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
