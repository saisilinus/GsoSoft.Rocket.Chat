import { IFundTransaction, Optional } from '@rocket.chat/core-typings';

export interface ITransactionService {
	/**
	 * Find transactions belonging to an owner ( person or organization )
	 * @param name
	 * @param options
	 */
	findByOwner(ownerId: any, options: any): Promise<IFundTransaction[]>;

	getById(transactionId: IFundTransaction['_id']): Promise<null | IFundTransaction>;

	archive(transactionId: IFundTransaction['_id']): Promise<boolean>;

	markAudited(transactionId: IFundTransaction['_id']): Promise<boolean>;
}
