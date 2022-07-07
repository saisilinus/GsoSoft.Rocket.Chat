import { IGateway, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IGatewaysModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class GatewaysRaw extends BaseRaw<IGateway> implements IGatewaysModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IGateway>>) {
		super(db, getCollectionName('gateway'), trash);
	}
}
