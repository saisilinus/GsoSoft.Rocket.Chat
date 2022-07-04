import { IComment, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ICommentsModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class CommentsRaw extends BaseRaw<IComment> implements ICommentsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IComment>>) {
		super(db, getCollectionName('comment'), trash);
	}
}
