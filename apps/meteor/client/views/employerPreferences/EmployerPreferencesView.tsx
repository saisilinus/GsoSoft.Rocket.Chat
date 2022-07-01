import { Accordion, Box, CheckBox, Icon, Tooltip } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { ReactElement, useMemo, useState } from 'react';

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import './tooltip.css';

const preferences: Record<string, any> = [
	{
		id: 'frontend',
		title: 'Frontend Developer',
		desc: 'The following are all activities/skills related to frontend development',
		items: ['Html', 'Css', 'Javascript', 'Webpack', 'Typescript'],
	},
	{
		id: 'backend',
		title: 'Backend Developer',
		desc: 'The following are all activities/skills related to backend development',
		items: ['Nodejs', 'Django', 'PHP', 'Scripting', 'Jest'],
	},
	{
		id: 'ai',
		title: 'AI Development',
		desc: 'The following are all activities/skills related to AI development',
		items: ['Python', 'Data engineering', 'Exploratory data analysis', 'Modelling', 'AWS Services'],
	},
];

const EmployerPreferencesView = (): ReactElement => {
	const [openGateway, setOpenGateway] = useState<Record<string, any>>({});
	const [closeGateway, setCloseGateway] = useState('');
	// const [checkedItems, setCheckedItems] = useState<string[]>([]);
	const t = useTranslation();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const openGatewayFn = useMemo((): void => {
		if (openGateway) {
			const element = document.querySelector(`#${openGateway.id}`);
			if (element) {
				// If the Accordion Item is closed then open it, otherwise close it.
				if (openGateway.open === 'true') {
					// @ts-ignore
					element.firstElementChild.setAttribute('aria-expanded', 'true');
					// @ts-ignore
					element.lastElementChild.className =
						'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel--expanded rcx-accordion-item__panel';
				} else {
					// @ts-ignore
					element.firstElementChild.setAttribute('aria-expanded', 'false');
					// @ts-ignore
					element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
				}
			}
		}
	}, [openGateway]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const closePreviousAccordionItem = useMemo(() => {
		if (closeGateway) {
			const element = document.querySelector(`#${closeGateway}`);
			if (element) {
				// @ts-ignore
				element.firstElementChild.setAttribute('aria-expanded', 'false');
				// @ts-ignore
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

	// const handleCheckBox = (item) => {};

	const handleRouteBack = (): void => {
		FlowRouter.go('/account/view-profile');
	};

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
		<Page id='topup-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={t('gso_topupView_profileHeader')} handleRouteBack={handleRouteBack} />
			<Page.ScrollableContentWithShadow>
				<Accordion style={{ margin: '15px 0' }}>
					{preferences.map((pref, index) => (
						/* @ts-ignore */
						<Accordion.Item key={index} title={pref.title} id={pref.id} onToggle={onAccordionToggle}>
							<Box>
								<p style={{ marginBottom: '15px' }}>{pref.desc}</p>
								{pref.items.map((item, index) => (
									<Box display='flex' key={index} justifyContent='space-between' style={{ marginBottom: '9px' }}>
										<Box display='flex'>
											<CheckBox key={index} />
											<p style={{ marginLeft: '8px' }}>{item}</p>
										</Box>
										<Box style={{ position: 'relative' }}>
											{/* The regex is meant to remove any spacing in the word so that we can later select this element using query selector */}
											<Tooltip id={item.replace(/\s+/g, '-')} className='invisible' placement='left'>
												Description
											</Tooltip>
											{/* Same thing here */}
											<Icon onClick={(): void => showToolTip(item.replace(/\s+/g, '-'))} name='info' size='x32' />
										</Box>
									</Box>
								))}
							</Box>
						</Accordion.Item>
					))}
				</Accordion>
			</Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default EmployerPreferencesView;
