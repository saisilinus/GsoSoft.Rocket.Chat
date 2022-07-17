import type { IUser } from '../IUser';
import type { IFundTransaction } from './IFundTransaction';
import type { IRocketChatRecord } from '../IRocketChatRecord';
import type { IRoom } from '../IRoom';
import type { ICurrency } from './ICurrency';

export interface IFundOwner {
	id: IUser['_id'] | IRoom['_id'];
	type: 'user' | 'group' | '2bDefined';
}

export interface IFundBalance extends IRocketChatRecord {
	owner: IFundOwner;
	accounts: Array<IFundAccount>;
}

/**
 * Each user may have different fund account for each currency. Only 1 account per currency
 */
export interface IFundAccount {
	currency: ICurrency['code'];
	updatedAt: Date;
	lastTransaction: IFundTransaction['_id'];
	/**
	 * available to spend, send, withdrawal etc...
	 */
	availableAmount: number;

	/**
	 * frozen, pending, seized, etc..., not available for spending
	 */
	unAvailableAmount: number;

	lastAmount: number; // for audit purpose
	lastAudited: Date;

	/**
	 * for atomicity in ACID
	 */
	lockedAt: Date;
	lockedBy: any;
}
