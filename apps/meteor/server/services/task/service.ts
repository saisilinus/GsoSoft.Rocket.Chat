import { Cursor } from 'mongodb';
import { ITask } from '@rocket.chat/core-typings/dist/gso';
import { Tasks } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import { ITaskService, ITaskCreateParams, ITaskUpdateParams } from '../../sdk/types/ITaskService';

export class TaskService extends ServiceClassInternal implements ITaskService {
	protected name = 'task';

	async create(params: ITaskCreateParams): Promise<ITask> {
		const createData: InsertionModel<ITask> = {
			...params,
			...(params.sortOrder ? { sortOrder: params.sortOrder } : { sortOrder: 0 }),
			startDate: new Date(),
			assignedBy: '',
			assignedTo: '',
		};
		const result = await Tasks.insertOne(createData);
		const task = await Tasks.findOneById(result.insertedId);
		if (!task) throw new Error('task-does-not-exist');
		return task;
	}

	async delete(taskId: string): Promise<void> {
		await this.getTask(taskId);
		await Tasks.removeById(taskId);
	}

	async getTask(taskId: string): Promise<ITask> {
		const task = await Tasks.findOneById(taskId);
		if (!task) {
			throw new Error('task-does-not-exist');
		}
		return task;
	}

	async update(taskId: string, params: ITaskUpdateParams): Promise<ITask> {
		await this.getTask(taskId);
		const query = {
			_id: taskId,
		};
		const updateData = {
			...params,
		};
		const result = await Tasks.updateOne(query, { $set: updateData });
		const task = await Tasks.findOneById(result.upsertedId._id.toHexString());
		if (!task) throw new Error('task-does-not-exist');
		return task;
	}

	list(
		{ offset, count }: IPaginationOptions = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<ITask> = { sort: { endDate: 1, sortOrder: -1 } },
	): Cursor<ITask> {
		return Tasks.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
