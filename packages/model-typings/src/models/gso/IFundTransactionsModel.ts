import type { IFundTransaction } from '@rocket.chat/core-typings';

import type { IBaseModel } from '../IBaseModel';

/**
 * Data layer object for IFundTransaction. Expose DB functions
 */
export interface IFundTransactionsModel extends IBaseModel<IFundTransaction> {
	/**
	 *
	 */
	findByStatus(userId: string, status: string): Promise<IFundTransaction>;

	/**
	 *
	 * fund transaction is often vulnerable to hack and abuse. Audit are always welcome
	 * @param transactionId
	 */
	markAsAudited(transactionId: IFundTransaction['_id']): Promise<void>;

	/**
	 * Return details
	 * @param transactionId
	 */
	getTransaction(transactionId: IFundTransaction['_id']): Promise<IFundTransaction>;

	findByOwner(name: any, options: any): any;
}
