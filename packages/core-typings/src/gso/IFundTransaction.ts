import type { IUser } from '../IUser';
import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IFundTransaction extends IRocketChatRecord {
	createdAt: Date;
	createdBy: IUser;
	amount: number;

	active: boolean;
	username?: string;
	nickname?: string;
	name?: string;

	status: any;

	creditType: TransactionType;

	/**
	 * mark if this transaction is audited.
	 */
	audited: boolean;
}

enum TransactionType {
	Debit = -1,
	Credit = 1,
}
