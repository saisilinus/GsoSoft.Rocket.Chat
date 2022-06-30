import { Cursor } from 'mongodb';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import { ITaskService, ITaskCreateParams, ITask, ITaskUpdateParams } from '../../../definition/ITask';
import { IPaginationOptions, IQueryOptions } from '../../../definition/ITeam';
import { InsertionModel } from '../../../app/models/server/raw/BaseRaw';
import { TasksModel } from '../../../app/models/server/raw';
import { TasksRaw } from '../../../app/models/server/raw/Tasks';

export class TaskService extends ServiceClassInternal implements ITaskService {
	protected name = 'task';

	private TaskModel: TasksRaw = TasksModel;

	async create(params: ITaskCreateParams): Promise<ITask> {
		const createData: InsertionModel<ITask> = {
			...params,
			...(params.sortOrder ? { sortOrder: params.sortOrder } : { sortOrder: 0 }),
			startDate: new Date(),
			assignedBy: '',
			assignedTo: '',
		};
		const result = await this.TaskModel.insertOne(createData);
		return this.TaskModel.findOneById(result.insertedId);
	}

	async delete(taskId: string): Promise<void> {
		await this.getTask(taskId);
		await this.TaskModel.removeById(taskId);
	}

	async getTask(taskId: string): Promise<ITask> {
		const task = await this.TaskModel.findOneById(taskId);
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
		const result = await this.TaskModel.updateOne(query, { $set: updateData });
		return this.TaskModel.findOneById(result.upsertedId._id.toHexString());
	}

	list(
		{ offset, count }: IPaginationOptions = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<ITask> = { sort: { endDate: 1, sortOrder: -1 } },
	): Cursor<ITask> {
		return this.TaskModel.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
