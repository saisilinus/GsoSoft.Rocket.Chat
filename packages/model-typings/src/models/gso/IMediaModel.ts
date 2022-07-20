import type { IMedia as T } from '@rocket.chat/core-typings';
import type { AggregationCursor } from 'mongodb';

import type { IBaseModel } from '../IBaseModel';

export interface IMediasModel extends IBaseModel<T> {
	getMediaWithComments(limit: number): AggregationCursor<T>;
}
