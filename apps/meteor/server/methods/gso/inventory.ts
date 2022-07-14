import { Meteor } from 'meteor/meteor';
import { IInventory, IUser } from '@rocket.chat/core-typings';

Meteor.methods({
	/**
	 * user sub
	 * @param transaction
	 */
	getUserInventory(): IInventory {
		return null;
	},
});
