import { IEscrow, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IEscrowsModel } from '@rocket.chat/model-typings';

import { BaseRaw } from './BaseRaw';
import { Collection, Cursor, Db, InsertOneWriteOpResult, UpdateWriteOpResult } from 'mongodb';

import { getCollectionName } from '@rocket.chat/models';

/**
 * Raw object for working with Escrow from DB
 *
 */
export class EscrowsRaw extends BaseRaw<IEscrow> implements IEscrowsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IEscrow>>) {
		super(db, getCollectionName('escrow', true), trash);
	}

	delete(EscrowId: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	getEscrow(EscrowId: string): Promise<IEscrow> {
		throw new Error('Method not implemented.');
	}

	findByUserId(userId: string): Cursor<IEscrow> {

		throw new Error('Method not implemented.');
	}

	create(doc: IEscrow): Promise<InsertOneWriteOpResult<IEscrow>> {
		throw new Error('Method not implemented.');
	}

	disable(bannerId: string): Promise<UpdateWriteOpResult> {
		throw new Error('Method not implemented.');
	}
}
