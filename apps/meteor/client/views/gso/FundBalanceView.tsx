import { IPaymentGateway } from '@rocket.chat/core-typings';
import { Accordion, Button, Grid } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
// @ts-ignore
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
// @ts-ignore
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

import Page from '../../components/Page';
import { useCapitalizeAndJoin } from '../../hooks/useCapitalization';
import SingleGame from '../games/SingleGame';

const FundBalanceView = (): ReactElement => {
	const [currencyList, setCurrencyList] = useState([]);
	const [fundBalance, setFundBalance] = useState(null);

	const t = useTranslation();
	const capitalize = useCapitalizeAndJoin();

	const fetchData = (): void => {
		Meteor.call('listCurrencies', {}, (error, result) => {
			if (result) {
				setCurrencyList(result);
			} else {
				console.log(error, 'error');
			}
		});

		Meteor.call('getUserFundBalance', Meteor.userId(), (error, result) => {
			if (result) {
				setFundBalance(result);
				console.log(result);
			} else {
				console.log(error, 'error');
			}
		});
	};

	return (
		<Page id='fund-balance-page'>
			<h2>List currencies</h2>

			{currencyList.length && currencyList.map((item, index) => <span key={index}>{item.code}</span>)}
			<hr />
			<h2>Fund balance</h2>
			<span>Owner id: {fundBalance?.owner}</span>

			{fundBalance?.accounts.map((item, index) => (
				<div key={index}>
					<span>{item.currency}</span>
					<br />
					<span>{item.realizedAmount}</span>
					<br />
					<span>{item.lastTransaction}</span>
					<br />
				</div>
			))}

			<Button primary onClick={(): void => fetchData()}>
				Fetch data
			</Button>
		</Page>
	);
};

export default FundBalanceView;
