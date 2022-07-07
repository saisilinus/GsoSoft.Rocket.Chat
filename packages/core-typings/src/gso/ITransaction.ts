import type { IGateway } from './IGateway';
import type { IRocketChatRecord } from '../IRocketChatRecord';
import type { IUser } from '../IUser';

export interface IGatewayData {
	gateway: IGateway['_id'];
	quantity: number;
	amount: number;
	currency: string;
}

export interface ITransaction extends IRocketChatRecord {
	hash: string;
	gateway: IGateway['_id'];
	transactionCode: string;
	quantity: number;
	amount: number;
	currency: string;
	status: 'success' | 'cancelled' | 'error';
	updatedBy?: IUser['_id'];
	createdAt: Date;
	createdBy: IUser['_id'];
	gatewayData: IGatewayData;
}
