import type { IFundTransaction } from './IFundTransaction';
import type { IUser } from '../IUser';
import type { IPaymentGateway, IPaymentGatewayData } from './IPaymentGateway';

export interface IDeposit extends IFundTransaction {
	hash: string;
	gateway: IPaymentGateway['_id'];

	toAccount: IUser['_id'];

	transactionCode: string;
	quantity: number;
	currency: string;
	status: 'success' | 'cancelled' | 'error';
	updatedBy?: IUser['_id'];
	gatewayData: IPaymentGatewayData;
}


// export type ITransactionLean = Omit<ITransaction, '_id' | '_updatedAt' | 'createdAt'>;
//
// export type ITransactionCreateParams = Omit<ITransactionLean, 'hash' | 'transactionCode' | 'gatewayData' | 'updatedBy'>;
//
// export type ITransactionUpdateParams = AtLeastOne<Omit<ITransactionLean, 'hash' | 'transactionCode'>>;
