import { ITask, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ITasksModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class TasksRaw extends BaseRaw<ITask> implements ITasksModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ITask>>) {
		super(db, getCollectionName('task'), trash);
	}
}
