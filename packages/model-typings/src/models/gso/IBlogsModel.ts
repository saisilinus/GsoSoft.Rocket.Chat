import type { IBlog as T } from '@rocket.chat/core-typings';
import type { AggregationCursor } from 'mongodb';

import type { IBaseModel } from '../IBaseModel';

export interface IBlogsModel extends IBaseModel<T> {
	getBlogsWithComments(limit: number): AggregationCursor<T>;
}
