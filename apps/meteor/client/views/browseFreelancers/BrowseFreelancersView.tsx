/* eslint-disable react/no-multi-comp */
import { Accordion, Box, MultiSelect, Button } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react';

import AddressPicker from '../../components/AddressPicker/AddressPicker';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import WorkerGroup from '../hallOfFame/components/WorkerGroup';

const projectType = ['Hourly', 'Fixed-Rate', 'Short-term', 'Long-term'];
const ranks = ['Rising Talent', 'Top Rated', 'Top Rated Plus', 'Expert Vetted'];

const BrowseFreelancersComponent = (): ReactElement => {
	const [openGateway, setOpenGateway] = useState<Record<string, any>>({});
	const [closeGateway, setCloseGateway] = useState('');
	const [listOfWorkers, setListOfWorkers] = useState<Record<string, any>[]>([]);

	useEffect(() => {
		Meteor.call('getWorkers', (error, result) => {
			if (result.length) {
				setListOfWorkers(result.slice(0, 3));
			}
		});
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	useMemo((): void => {
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
	useMemo(() => {
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
	const onAccordionToggle = (e, trigger): void => {
		// Close the previously opened gateway
		if (openGateway.id) {
			setCloseGateway(openGateway.id);
		}
		// If the event was triggered by the collapse button
		if (trigger === 'button') {
			const accordionItem = document.querySelector(`#${e}`)?.firstChild;
			let open = 'false';
			// @ts-ignore
			if (accordionItem.getAttribute('aria-expanded') === 'false') {
				open = 'true';
			}
			setOpenGateway({ open, id: e });
		} else {
			const accordionItem = e.currentTarget.parentNode;
			let open = 'false';
			if (e.currentTarget.getAttribute('aria-expanded') === 'false') {
				open = 'true';
			}
			setOpenGateway({ open, id: accordionItem.id });
		}
	};

	const handleLoadMore = (): void => {
		Meteor.call('getWorkers', (error, result) => {
			if (result.length) {
				setListOfWorkers(result);
			}
		});
	};
	return (
		<Accordion style={{ margin: '30px 0' }}>
			{projectType.map((project, index) => (
				// @ts-ignore
				<Accordion.Item title={project} key={index} id={project} defaultExpanded={index === 0} onToggle={onAccordionToggle}>
					<Box display='flex' flexDirection='column'>
						<MultiSelect
							style={{ marginLeft: 'auto', marginBottom: '15px', width: '70%' }}
							options={[
								['1', ranks[0]],
								['2', ranks[1]],
								['3', ranks[2]],
								['4', ranks[3]],
							]}
							onChange={function (_params: string[]): void {
								throw new Error('Function not implemented.');
							}}
							placeholder='Sort by ranks'
						/>
						<WorkerGroup workerData={listOfWorkers} />
						<Box display='flex' justifyContent='space-between' style={{ marginTop: '45px' }}>
							<Button primary onClick={handleLoadMore}>
								Load more
							</Button>
							<Button secondary onClick={(): void => onAccordionToggle(project, 'button')}>
								Collapse
							</Button>
						</Box>
					</Box>
				</Accordion.Item>
			))}
		</Accordion>
	);
};

const BrowseFreelancersView = (): ReactElement => {
	const { value } = useContext(UserPreviousPageContext);
	const t = useTranslation();

	const handleRouteBack = (): void => {
		FlowRouter.go(`${value.location}`);
	};
	return (
		<AddressPicker
			id='hall-of-fame'
			// @ts-ignore
			title={t('gso_browseFreelancers_header')}
			handleRouteBack={handleRouteBack}
			children={<BrowseFreelancersComponent />}
		/>
	);
};

export default BrowseFreelancersView;
