import type { IUser } from '../IUser';
import type { IFundTransaction } from './IFundTransaction';
import type { IRocketChatRecord } from '../IRocketChatRecord';
import type { IRoom } from '../IRoom';

export interface IBalance extends IRocketChatRecord {
	/**
	 * for atomicity in ACID
	 */
	lockedAt: Date;
	lockedBy: any;
	updatedAt: Date;

	owner: IUser['_id'] | IRoom['_id'];

	lastTransaction: IFundTransaction;
	/**
	 * available to spend, send, withdrawal etc...
	 */
	realizedAmount: number;

	/**
	 * frozen, pending, seized, etc..
	 */
	unrealizedAmount: number;

	lastAmount: number; // for audit purpose
}
