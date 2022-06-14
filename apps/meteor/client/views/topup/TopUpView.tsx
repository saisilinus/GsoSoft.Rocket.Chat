import { Accordion, Box, Button } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

import { IGateway } from '../../../definition/IGateway';
import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { useCapitalizeAndJoin } from '../../hooks/useCapitalization';
import BankTransfer from './components/BankTransfer';
import Components from './components/Components';
import PerfectMoneyVoucher from './components/PerfectMoneyVoucher';
import './topup.css';

const TopUpView = (): ReactElement => {
	const [fetchedGateways, setFetchedGateways] = useState<IGateway[]>([]);
	const [openGateway, setOpenGateway] = useState<Record<string, any>>({});
	const [closeGateway, setCloseGateway] = useState('');
	const t = useTranslation();
	const capitalize = useCapitalizeAndJoin();

	const getGatewaysFn = (): void => {
		Meteor.call('getStaticGateways', {}, {}, (_error, result) => {
			if (result) {
				if (result.length) {
					setFetchedGateways(result);
					// setOpenGateway({ open: 'true', id: result[0]._id });
					console.log('Gateways were fetched');
				} else {
					console.log(_error, 'error')
				}
			}
		});
	};

	useEffect(() => {
		getGatewaysFn();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _openGatewayFn = useMemo((): void => {
		if (openGateway) {
			const element = document.querySelector(`#${openGateway.id}`);
			if (element) {
				// If the Accordion Item is closed then open it, otherwise close it.
				if (openGateway.open === 'true') {
					element.firstElementChild.setAttribute('aria-expanded', 'true');
					element.lastElementChild.className =
						'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel--expanded rcx-accordion-item__panel';
				} else {
					element.firstElementChild.setAttribute('aria-expanded', 'false');
					element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
				}
			}
		}
	}, [openGateway]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _closePreviousAccordionItem = useMemo(() => {
		if (closeGateway) {
			const element = document.querySelector(`#${closeGateway}`);
			if (element) {
				element.firstElementChild.setAttribute('aria-expanded', 'false');
				element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
			}
		}
	}, [closeGateway]);

	const onAccordionToggle = (e): void => {
		// Close the previously opened gateway
		if (openGateway.id) {
			setCloseGateway(openGateway.id);
		}
		const accordionItem = e.currentTarget.parentNode;
		let open = 'false';
		if (e.currentTarget.getAttribute('aria-expanded') === 'false') {
			open = 'true';
		}
		setOpenGateway({ open, id: accordionItem.id });
	};

	const handleRouteBack = (): void => {
		FlowRouter.go('/account/view-profile');
	};

	return (
		<Page id='topup-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={t('gso_topupView_profileHeader')} handleRouteBack={handleRouteBack} />
			<Page.ScrollableContentWithShadow>
				{/* @ts-ignore */}
				<h3 style={{ fontSize: '19px', marginBottom: '10px' }}>{t('gso_topupView_title')}</h3>
				{/* @ts-ignore */}
				<p style={{ fontSize: '16px' }}>{t('gso_topupView_info')}</p>
				<Accordion style={{ margin: '15px 0' }}>
					{fetchedGateways.length
						? fetchedGateways.map((gateway) => { 
							if (gateway.cmpClass === undefined || gateway.cmpClass === '') {
								return (
										<Accordion.Item title={capitalize(gateway._id)} disabled={true} />
								);
							}

							if (gateway.show === false) {
								return (
									// @ts-ignore
									<Accordion.Item title={capitalize(gateway._id)} id={gateway._id} onToggle={onAccordionToggle}>
										{Components({
											id: gateway._id,
											cmpClass: gateway.cmpClass,
											capitalize,
											onAccordionToggle
										})}
									</Accordion.Item>
								);
							}
})
						: 'Loading...'}
				</Accordion>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default TopUpView;
