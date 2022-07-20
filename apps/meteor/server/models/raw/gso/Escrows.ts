import { IEscrow, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IEscrowsModel } from '@rocket.chat/model-typings';
import { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class EscrowsRaw extends BaseRaw<IEscrow> implements IEscrowsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IEscrow>>) {
		super(db, 'escrow', trash);
	}
}
