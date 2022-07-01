import type { Cursor, AggregationCursor } from 'mongodb';
import type { IRoom, IOmnichannelGenericRoom, IFundTransaction } from '@rocket.chat/core-typings';

import type { IBaseModel } from './IBaseModel';
import { IBanner } from '@rocket.chat/core-typings';
import { InsertOneWriteOpResult } from 'mongodb';

/**
 * Data layer object for IFundTransaction
 */
export interface IFundTransactionsModel extends IBaseModel<IRoom> {
	create(doc: IFundTransaction): Promise<InsertOneWriteOpResult<IBanner>>;

	/**
	 *
	 * @param transactionId
	 */
	markAsAudited(transactionId: IFundTransaction['_id']): Promise<void>;

	getTransaction(transactionId: IFundTransaction['_id']): Promise<IFundTransaction>;

	findByOwner(name: any, options: any): any;

}
