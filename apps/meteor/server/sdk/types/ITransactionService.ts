import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import { AtLeastOne, ITransaction } from '@rocket.chat/core-typings/src/gso';
import { Cursor } from 'mongodb';

export type ITransactionLean = Omit<ITransaction, '_id' | '_updatedAt' | 'createdAt'>;

export type ITransactionCreateParams = Omit<ITransactionLean, 'hash' | 'transactionCode' | 'gatewayData' | 'updatedBy'>;

export type ITransactionUpdateParams = AtLeastOne<Omit<ITransactionLean, 'hash' | 'transactionCode'>>;

export interface ITransactionService {
	create(params: ITransactionCreateParams): Promise<ITransaction>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<ITransaction>): Cursor<ITransaction>;
	update(transactionId: ITransaction['_id'], params: ITransactionUpdateParams): Promise<ITransaction>;
	delete(transactionId: ITransaction['_id']): Promise<void>;
	getTransaction(transactionId: ITransaction['_id']): Promise<ITransaction>;
}
