import { Meteor } from 'meteor/meteor';
import { IInventory, IInventoryItem, IUser } from '@rocket.chat/core-typings';

Meteor.methods({
	/**
	 * user sub
	 * @param transaction
	 */
	getUserInventory(): IInventory {
		return null;
	},

	/**
	 *
	 */
	getGiftableItems(): IInventoryItem[] {
		return null;
	},

	sendGift(items: IInventoryItem[], toUser: IUser['_id']): boolean {
		console.log(items, toUser);
		return null;
	},
});
