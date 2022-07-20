import type { IAvatar, IFundBalance, IFundOwner, IFundTransaction, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { FindPaginated, IAvatarsModel, IFundBalancesModel, InsertionModel } from '@rocket.chat/model-typings';
import type {
	Collection,
	Db,
	DeleteResult,
	IndexDescription,
	UpdateResult,
	Document,
	BulkWriteOptions,
	ChangeStream,
	ChangeStreamDocument,
	DeleteOptions,
	Filter,
	FindCursor,
	FindOneAndUpdateOptions,
	FindOptions,
	InsertManyResult,
	InsertOneOptions,
	InsertOneResult,
	ModifyResult,
	UpdateFilter,
	UpdateOptions,
	WithId,
} from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class FundBalancesRaw extends BaseRaw<IFundBalance> implements IFundBalancesModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IFundBalance>>) {
		super(db, 'fund_balance', trash);
	}

	markAsAudited(transactionId: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	getTransaction(transactionId: string): Promise<IFundTransaction> {
		throw new Error('Method not implemented.');
	}

	findByOwner(owner: IFundOwner): Promise<IFundBalance> {
		return this.findOne({ owner });
	}
}
