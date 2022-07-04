import type { IRoom, IFundTransaction, IBanner } from '@rocket.chat/core-typings';
import type { InsertOneWriteOpResult } from 'mongodb';

import type { IBaseModel } from '../IBaseModel';

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
