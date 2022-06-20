import { Cursor } from 'mongodb';

import { AtLeastOne } from './AtLeastOne';
import { IRocketChatRecord } from './IRocketChatRecord';
import { IPaginationOptions, IQueryOptions } from './ITeam';
import { PartialBy } from './PartialBy';

export interface ITask extends IRocketChatRecord {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	assignedBy: string;
	assignedTo: string;
	type: 'daily' | 'longterm' | 'achievements';
	sortOrder: number;
	status: -1 | 0 | 1;
	reward: number;
}

export type ITaskLean = Omit<ITask, '_id' | '_updatedAt'>;

export type ITaskCreateParams = PartialBy<Omit<ITask, '_id' | '_updatedAt' | 'startDate' | 'assignedBy' | 'assignedTo'>, 'sortOrder'>;

export type ITaskUpdateParams = AtLeastOne<ITaskLean>;

export interface ITaskService {
	create(params: ITaskCreateParams): Promise<ITask>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<ITask>): Cursor<ITask>;
	update(taskId: ITask['_id'], params: ITaskUpdateParams): Promise<ITask>;
	delete(taskId: ITask['_id']): Promise<void>;
	getTask(taskId: ITask['_id']): Promise<ITask>;
}
