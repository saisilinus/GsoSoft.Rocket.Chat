import { Accordion } from '@rocket.chat/fuselage';
import React, { createElement, ReactElement } from 'react';

import BankTransfer from './BankTransfer';
import PerfectMoneyVoucher from './PerfectMoneyVoucher';

const Components = {
	PerfectMoneyVoucherFormCmp: PerfectMoneyVoucher,
	BankTransferFormCmp: BankTransfer,
};

// eslint-disable-next-line react/display-name
export default (block): ReactElement => {
	if (typeof Components[block.cmpClass] !== 'undefined') {
		return createElement(Components[block.cmpClass], {
			key: block.id,
			id: block.id,
			title: block.title,
			onToggle: block.onAccordionToggle,
			capitalize: block.capitalize,
		});
	}
	return createElement(
		// @ts-ignore
		() => <Accordion.Item title={block._id} id={block._id} onToggle={block.onToggle}></Accordion.Item>,
		{ key: block.id },
	);
};
