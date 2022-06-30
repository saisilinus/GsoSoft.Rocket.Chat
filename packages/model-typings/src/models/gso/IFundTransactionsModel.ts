import type { Cursor, AggregationCursor } from 'mongodb';
import type { IRoom, IOmnichannelGenericRoom, IFundTransaction } from '@rocket.chat/core-typings';

import type { IBaseModel } from './IBaseModel';

export interface IFundTransactionsModel extends IBaseModel<IRoom> {
	create(params: ITransactionCreateParams): Promise<IFundTransaction>;

	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<ITransaction>): Cursor<ITransaction>;

	update(transactionId: ITransaction['_id'], params: ITransactionUpdateParams): Promise<ITransaction>;

	/**
	 *
	 * @param transactionId
	 */
	markAsAudited(transactionId: ITransaction['_id']): Promise<void>;

	getTransaction(transactionId: ITransaction['_id']): Promise<ITransaction>;

	findByOwner(name: any, options: any): any;

}
