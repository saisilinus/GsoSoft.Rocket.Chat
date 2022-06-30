import { AggregationCursor } from 'mongodb';

import { BaseRaw } from './BaseRaw';
import { ITag as T } from '../../../../definition/ITag';

export class TagsRaw extends BaseRaw<T> {
	getTagsByCategory(limit = 3): AggregationCursor<T> {
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
