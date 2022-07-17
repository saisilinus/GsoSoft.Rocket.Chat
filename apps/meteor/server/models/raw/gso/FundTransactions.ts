import { IFundTransaction, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IFundTransactionsModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class FundTransactionsRaw extends BaseRaw<IFundTransaction> implements IFundTransactionsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IFundTransaction>>) {
		super(db, getCollectionName('fund_transaction'), trash);
	}

	markAsAudited(transactionId: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	getTransaction(transactionId: string): Promise<IFundTransaction> {
		throw new Error('Method not implemented.');
	}

	findByOwner(name: any, options: any) {
		throw new Error('Method not implemented.');
	}

	findByStatus(name: any, options: any) {
		throw new Error('Method not implemented.');
	}
}
