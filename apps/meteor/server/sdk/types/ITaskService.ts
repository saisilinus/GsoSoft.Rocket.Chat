import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import { AtLeastOne, ITask, PartialBy } from '@rocket.chat/core-typings/src/gso';
import { Cursor } from 'mongodb';

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
