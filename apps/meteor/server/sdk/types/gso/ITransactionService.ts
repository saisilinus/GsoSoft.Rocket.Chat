import { IFundTransaction } from '@rocket.chat/core-typings';

export interface ITransactionService {
	/**
	 * Since there are many type of transaction, custom logic would be needed before call insertOne
	 * @param doc fund-transaction sub type object
	 */
	create(doc: IFundTransaction): Promise<IFundTransaction>;

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
