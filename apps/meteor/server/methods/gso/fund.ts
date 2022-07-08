import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { IDeposit, IFundTransaction, ISendFund, IUser, IWithdraw } from '@rocket.chat/core-typings';

import { FundTransactionService } from '../../services/gso';

/**
 * All fund related method exposed to client side
 */
Meteor.methods({
	// Mock trust score
	async blabla() {
		return 12342134;
	},
});
