import { IBanner, RocketChatRecordDeleted } from '@rocket.chat/core-typings';

import { BaseRaw } from '../BaseRaw';

import type { IFundTransactionsModel } from '@rocket.chat/model-typings';
import { IFundTransaction } from '@rocket.chat/core-typings';
import { Collection, Db } from 'mongodb';

import { getCollectionName } from '@rocket.chat/models';

export class FundTransactionsRaw extends BaseRaw<IFundTransaction> implements IFundTransactionsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IBanner>>) {
		super(db, getCollectionName('banner'), trash);
	}

}
