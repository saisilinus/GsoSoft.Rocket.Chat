import { Accordion, Box } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { useContext, useEffect, useMemo, useState } from 'react'

import Page from '../../components/Page';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import { useCapitalizeAndJoin } from '../../hooks/useCapitalization';
import { UserPreviousPageContext } from '../../contexts/UserPreviousPageContext/GlobalState';
import EmployerRole from './components/EmployerRole';
import EmployeeRole from './components/EmployeeRole';
import BrokerRole from './components/BrokerRole';

const SelectRoleView = () => {
    const [fetchedRoles, setFetchedRoles] = useState<Record<string, any>[]>([]);
	const [openRole, setOpenRole] = useState<Record<string, any>>({});
	const [closeRole, setCloseRole] = useState('');
	const t = useTranslation();
	const capitalize = useCapitalizeAndJoin();
    const {value} = useContext(UserPreviousPageContext)


	const getRolesFn = (): void => {
		Meteor.call('getConfig', (_error, result) => {
			if (result) {
                console.log(result, 'fetchedRoles')
					setFetchedRoles(result);
                    setOpenRole({ open: 'true', id: result[0].id })
					console.log('Roles were fetched');
			}
		});
	};

	useEffect(() => {
        if (!fetchedRoles.length) getRolesFn();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchedRoles]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _openRoleFn = useMemo((): void => {
		if (openRole) {
			const element = document.querySelector(`#${openRole.id}`);
			if (element) {
				// If the Accordion Item is closed then open it, otherwise close it.
				if (openRole.open === 'true') {
					element.firstElementChild.setAttribute('aria-expanded', 'true');
					element.lastElementChild.className =
						'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel--expanded rcx-accordion-item__panel';
				} else {
					element.firstElementChild.setAttribute('aria-expanded', 'false');
					element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
				}
			}
		}
	}, [openRole]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _closePreviousAccordionItem = useMemo(() => {
		if (closeRole) {
			const element = document.querySelector(`#${closeRole}`);
			if (element) {
				element.firstElementChild.setAttribute('aria-expanded', 'false');
				element.lastElementChild.className = 'rcx-box rcx-box--full rcx-box--animated rcx-accordion-item__panel';
			}
		}
	}, [closeRole]);

	const onAccordionToggle = (e): void => {
		// Close the previously opened gateway
		if (openRole.id) {
			setCloseRole(openRole.id);
		}
		const accordionItem = e.currentTarget.parentNode;
        console.log(accordionItem)
		let open = 'false';
		if (e.currentTarget.getAttribute('aria-expanded') === 'false') {
			open = 'true';
		}
		setOpenRole({ open, id: accordionItem.id });
	};

	const handleRouteBack = (): void => {
        console.log(value.location)
		FlowRouter.go(`${value.location}`);
	};
  return (
    <Page id='topup-page'>
			{/* @ts-ignore */}
			<ProfileHeader title={`${t('gso_selectRoleView_profileHeader')}`} handleRouteBack={handleRouteBack} />
			<Page.ScrollableContentWithShadow>
				{/* @ts-ignore */}
				<p style={{ fontSize: '16px' }}>{t('gso_selectRoleView_info')}</p>
				<Accordion style={{ margin: '15px 0' }}>
					{fetchedRoles.length
						? fetchedRoles.map((role, index) => (
                            <div key={index}>
                                {role.cmpClass === 'EmployerRoleFormCmp' ? <EmployerRole title={capitalize(role.id)} id={role.id} onToggle={onAccordionToggle} /> : null}
                                {role.cmpClass === 'EmployeeRoleFormCmp' ? <EmployeeRole title={capitalize(role.id)} id={role.id} onToggle={onAccordionToggle} /> : null}
                                {role.cmpClass === 'BrokerRoleFormCmp' ? <BrokerRole title={capitalize(role.id)} id={role.id} onToggle={onAccordionToggle} /> : null}
                            </div>
						  ))
						: 'Loading...'}
				</Accordion>
			</Page.ScrollableContentWithShadow>
		</Page>
  )
}

export default SelectRoleView