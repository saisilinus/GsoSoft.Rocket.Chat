import { ITagGroup, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ITagGroupsModel } from '@rocket.chat/model-typings';
import { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class TagGroupsRaw extends BaseRaw<ITagGroup> implements ITagGroupsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ITagGroup>>) {
		super(db, 'tagGroup', trash);
	}
}
