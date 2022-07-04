import { IGame, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IGamesModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class GamesRaw extends BaseRaw<IGame> implements IGamesModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IGame>>) {
		super(db, getCollectionName('game'), trash);
	}
}
