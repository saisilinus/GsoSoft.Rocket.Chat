import type { IUser } from '../IUser';
import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IInventory extends IRocketChatRecord {
	createdAt: Date;
	ownerId: IUser['_id'];
	/**
	 *
	 */
	items: Array<IInventoryItem>;
	/**
	 * Total number of item. Each item type is counted as 1. Not the  amount of each item-type combined
	 */
	itemCount: number;
}


/**
 * Item in user inventory/bag. Item can be created by various modules within the system, and can be burned/exchange for other items.
 */
export interface IInventoryItem {
	itemId: IInventory['_id'];
	createdAt: Date;
	lastUpdate: Date;
	amount: number;
	isNew: boolean;
}

/**
 * Item in user inventory/bag. Item can be created by various modules within the system, and can be burned/exchange for other items.
 */
export interface IItem {
	/**
	 * module that manage this type of item
	 */
	managedBy: any;

	/**
	 * sale price versus the global currency
	 */
	price: number;
	/**
	 * name language key
	 */
	nameLangKey: string;
	icon: string;
	/**
	 * description language key
	 */
	descLangKey: string;
}
