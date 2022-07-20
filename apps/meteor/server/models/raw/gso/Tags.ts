import { ITag, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ITagsModel } from '@rocket.chat/model-typings';
import { Db, Collection, AggregationCursor } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class TagsRaw extends BaseRaw<ITag> implements ITagsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ITag>>) {
		super(db, 'tag', trash);
	}

	getTagsByCategory(limit = 3): AggregationCursor<ITag> {
		const pipeline = [
			{
				$group: {
					_id: '$category',
					docs: {
						$push: '$$ROOT',
					},
				},
			},
			{
				$project: {
					docs: {
						$slice: ['$docs', limit],
					},
					_id: 0,
				},
			},
			{
				$unwind: '$docs',
			},
			{
				$replaceRoot: {
					newRoot: '$docs',
				},
			},
		];
		return this.col.aggregate(pipeline);
	}
}
