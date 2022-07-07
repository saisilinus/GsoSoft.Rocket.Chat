import type { IFundTransaction } from './IFundTransaction';
import type { IUser } from '../IUser';
import type { IPaymentGateway, IPaymentGatewayData } from './IPaymentGateway';

export interface IWithdraw extends IFundTransaction {
	hash: string;
	gateway: IPaymentGateway['_id'];

	toAccount: IUser['_id'];

	transactionCode: string;
	quantity: number;
	amount: number;
	currency: string;
	status: 'success' | 'cancelled' | 'error';
	updatedBy?: IUser['_id'];
	gatewayData: IPaymentGatewayData;
}
