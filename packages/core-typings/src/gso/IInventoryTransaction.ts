import type { IUser } from '../IUser';
import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IInventoryTransaction extends IRocketChatRecord {
	createdAt: Date;
	createdBy: IUser;
	amount: number;
	status: any;


	/**
	 * mark if this transaction is audited.
	 */
	audited: boolean;
}
