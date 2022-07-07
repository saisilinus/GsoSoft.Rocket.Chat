import { ITransaction, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ITransactionsModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class TransactionsRaw extends BaseRaw<ITransaction> implements ITransactionsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ITransaction>>) {
		super(db, getCollectionName('transaction'), trash);
	}
}
