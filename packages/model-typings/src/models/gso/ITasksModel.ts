import type { Cursor, UpdateWriteOpResult, InsertOneWriteOpResult } from 'mongodb';
import type { IEscrow } from '@rocket.chat/core-typings';

import type { IBaseModel } from './IBaseModel';

export interface ITasksModel extends IBaseModel<IEscrow> {
	delete(EscrowId: IEscrow['_id']): Promise<void>;

	getEscrow(EscrowId: IEscrow['_id']): Promise<IEscrow>;

	findByUserId(userId: IEscrow['userId']): Cursor<IEscrow>;

	create(doc: IEscrow): Promise<InsertOneWriteOpResult<IEscrow>>;

}
