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
		localStorage.setItem('showModal', 'false');
	};

	useEffect(() => {
		const showModal = localStorage.getItem('showModal');
		if (showModal === 'true' || showModal === 'reset') {
			setModal(true);
			setBanner(true);
		} else if (showModal === 'false' || showModal === undefined) {
			setModal(false);
			setBanner(false);
		}
	}, []);

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
