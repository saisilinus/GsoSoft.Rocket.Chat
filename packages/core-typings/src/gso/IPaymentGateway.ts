import type { IRocketChatRecord } from '../IRocketChatRecord';
import type { IFundTransaction } from './IFundTransaction';

/**
 * Payment gateway such as paypal, webmoney, crypto used by our system to help users depositing fund
 */
export interface IPaymentGateway extends IRocketChatRecord {
	show: boolean;
	active: boolean;
	sortOrder: number;
	icon: string;
	cmpClass?: string;
	cmpConfig?: Record<string, any>;
}

export interface IPaymentGatewayData {
	gateway: IPaymentGateway['_id'];
	quantity: number;
	amount: number;
	currency: string;
}

/**
 * Payment-transaction from supported payment-gateway
 */
export interface IGatewayTransaction {
	/**
	 * reference to the deposit/withdrawal transaction
	 */
	fundId: IFundTransaction['_id'];
	/**
	 * user input
	 */
	inputData: any;
	/**
	 * data returned by the gateway itself
	 */
	outputData: any;

	/**
	 * status of the transaction
	 */
	status: 'init' | 'success' | 'cancelled' | 'error';
}
