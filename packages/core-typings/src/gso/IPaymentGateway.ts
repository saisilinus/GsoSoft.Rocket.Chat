import type { IRocketChatRecord } from '../IRocketChatRecord';

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
