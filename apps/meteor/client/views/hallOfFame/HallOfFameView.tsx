import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { ReactElement, useContext } from 'react';

import AddressPicker from '../../components/AddressPicker/AddressPicker';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';

const HallOfFameView = (): ReactElement => {
	const { value } = useContext(UserPreviousPageContext);
	const t = useTranslation();

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};
	return (
		<AddressPicker
			id='hall-of-fame'
			// @ts-ignore
			title={t('gso_hallOfFamePage_header')}
			handleRouteBack={handleRouteBack}
			children={<div>Hall of fame</div>}
		/>
	);
};

export default HallOfFameView;
