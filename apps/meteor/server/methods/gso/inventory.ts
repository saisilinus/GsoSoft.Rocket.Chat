import { Meteor } from 'meteor/meteor';
import { IGatewayTransaction } from '@rocket.chat/core-typings';

Meteor.methods({
	'getUserInventory'() {
		return '';
	},
	/**
	 * user sub
	 * @param transaction
	 */
	'inventory.listUserItems'(transaction: IGatewayTransaction) {
		console.log(transaction);
		return [];
	},
});
