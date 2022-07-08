import type { ITask } from '@rocket.chat/core-typings';

import type { IBaseModel } from '../IBaseModel';

export interface ITasksModel extends IBaseModel<ITask> {
	findByOwner(name: any, options: any): any;
}
