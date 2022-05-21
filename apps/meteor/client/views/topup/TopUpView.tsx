import { Accordion, Box } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import { Meteor } from 'meteor/meteor';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

import { IGateway } from '../../../definition/IGateway';
import Page from '../../components/Page';
import BankTransfer from './components/BankTransfer';
import PerfectMoneyVoucher from './components/PerfectMoneyVoucher';
import './topup.css';

const TopUpView = (): ReactElement => {
	const [fetchedGateways, setFetchedGateways] = useState<IGateway[]>([]);
	const [openGateway, setOpenGateway] = useState<Record<string, any>>({});
	const [closeGateway, setCloseGateway] = useState('');
	const t = useTranslation();
	const gateways = [
		{
			_id: 'perfect-money-voucher',
			show: true,
			active: true,
			sortOrder: 1,
			icon: 'voucher',
			cmpClass: 'PerfectMoneyVoucher',
		},
		{
			_id: 'bank-transfer',
			show: true,
			active: true,
			sortOrder: 2,
			icon: 'bank',
			cmpClass: 'BankTransfer',
		},
		{
			_id: 'usdt-blockchain',
			show: true,
			active: true,
			sortOrder: 3,
			icon: 'usdt',
			cmpClass: 'UsdtBlockChain',
		},
		{
			_id: 'credit-card',
			show: true,
			active: true,
			sortOrder: 4,
			icon: 'card',
			cmpClass: 'CreditCard',
		},
		{
			_id: 'paypal',
			show: true,
			active: true,
			sortOrder: 5,
			icon: 'paypal-icon',
			cmpClass: 'PaypalClass',
		},
	];

	const sortedGateways = useMemo(() => fetchedGateways.sort((a, b) => a.sortOrder - b.sortOrder), [fetchedGateways]);

	const getGatewaysFn = (): void => {
		Meteor.call('getGateways', {}, {}, (_error, result) => {
			if (result) {
				if (result.length) {
					setFetchedGateways(result);
					setOpenGateway({ open: 'true', id: result[0]._id });
					console.log('Gateways were fetched');
				} else {
					gateways.map((gateway, index) => {
						// The server requires us to wait atleast 2 seconds before sending in a new request.
						if (index > 0) {
							setTimeout(() => {
								Meteor.call('addGateway', gateway, (_error, result) => {
									if (result) {
										console.log('Gateway was created');
									}
								});
							}, 4000);
						}

						// Refetch the games once its done adding.
						if (index === gateways.length - 1) {
							getGatewaysFn();
						}
						return null;
					});
				}
			}
		});
	};

	useEffect(() => {
		getGatewaysFn();
	}, []);

	const openGatewayFn = useMemo((): void => {
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

	const closePreviousAccordionItem = useMemo(() => {
		if (closeGateway) {
			const element = document.querySelector(`#${closeGateway}`);
			if (element) {
				element.firstElementChild.setAttribute('aria-expanded', 'false');
				element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
			}
		}
	}, [closeGateway]);

	const capitalizeAndJoin = (word: string): string => {
		const capitalize = word.charAt(0).toUpperCase() + word.slice(1);
		return capitalize.replace(/-/g, ' ');
	};

	const onAccordionToggle = (e) => {
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

	return (
		<Page id='topup-page'>
			<Page.Header title={t('Edit')} />
			<Box style={{ margin: '15px 15px 0 15px' }}>
				{/* @ts-ignore */}
				<h3 style={{ fontSize: '19px', marginBottom: '10px' }}>{t('gso_topupView_title')}</h3>
				{/* @ts-ignore */}
				<p style={{ fontSize: '16px' }}>{t('gso_topupView_info')}</p>
				<Accordion style={{ margin: '15px 0' }}>
					{sortedGateways.length ? (
						<>
							<PerfectMoneyVoucher
								title={capitalizeAndJoin(sortedGateways[0]._id)}
								id={sortedGateways[0]._id}
								onToggle={(e) => onAccordionToggle(e)}
								capitalize={capitalizeAndJoin}
							/>
							<BankTransfer
								title={capitalizeAndJoin(sortedGateways[1]._id)}
								id={sortedGateways[1]._id}
								onToggle={(e) => onAccordionToggle(e)}
								capitalize={capitalizeAndJoin}
							/>
						</>
					) : (
						'Loading...'
					)}
					{sortedGateways.length
						? sortedGateways.slice(2).map((gateway, index) => (
								// @ts-ignore
								<Accordion.Item title={capitalizeAndJoin(gateway._id)} onToggle={(e) => onAccordionToggle(e)} id={gateway._id} key={index}>
									<Box color='default' fontScale='p2'>
										{capitalizeAndJoin(gateway._id)}
									</Box>
								</Accordion.Item>
						  ))
						: 'Loading...'}
				</Accordion>
			</Box>
		</Page>
	);
};

export default TopUpView;
