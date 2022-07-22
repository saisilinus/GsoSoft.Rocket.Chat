/* eslint-disable react/no-multi-comp */
import { Button } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { ReactElement, useContext } from 'react';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import InstagramPost from './components/InstagramPost';
import CreatePostModal from './components/createPostModal';

const InstagramClone = (): ReactElement => {
	const t = useTranslation();
	const { value } = useContext(UserPreviousPageContext);

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};
	return (
		<Page id='instagram-clone-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={t('gso_instagramView_title')} handleRouteBack={handleRouteBack} page='instagram' />
			<Page.ScrollableContentWithShadow>
				<CreatePostModal />
				<InstagramPost />
				<Button primary>Load more</Button>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default InstagramClone;
