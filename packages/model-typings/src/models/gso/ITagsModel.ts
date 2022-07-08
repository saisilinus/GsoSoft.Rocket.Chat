import type { ITag as T } from '@rocket.chat/core-typings';
import type { AggregationCursor } from 'mongodb';

import type { IBaseModel } from '../IBaseModel';

export interface ITagsModel extends IBaseModel<T> {
	getTagsByCategory(limit?: number): AggregationCursor<T>;
}
