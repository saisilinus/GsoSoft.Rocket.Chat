import type { IUser } from '../IUser';
import type { IRocketChatRecord } from '../IRocketChatRecord';
import type { IGatewayTransaction, IPaymentGateway } from './IPaymentGateway';

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

export interface ITransactionCreateParams {
	gateway: IPaymentGateway['_id'];
	transactionCode: string;
	quantity: number;
	amount: number;
	currency: string;
	status: 'success' | 'cancelled' | 'error';
	updatedBy?: IUser['_id'];
	createdAt: Date;
	createdBy: IUser['_id'];
	gatewayData: IGatewayTransaction;
}
