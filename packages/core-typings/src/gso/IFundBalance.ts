import type { IUser } from '../IUser';
import type { IFundTransaction } from './IFundTransaction';
import type { IRocketChatRecord } from '../IRocketChatRecord';
import type { IRoom } from '../IRoom';
import type { ICurrency } from './ICurrency';

export interface IFundBalance extends IRocketChatRecord {
	/**
	 * for atomicity in ACID
	 */
	lockedAt: Date;
	lockedBy: any;

	owner: IUser['_id'] | IRoom['_id'];
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
	realizedAmount: number;

	/**
	 * frozen, pending, seized, etc..
	 */
	unrealizedAmount: number;

	lastAmount: number; // for audit purpose
	lastAudited: Date;
}
