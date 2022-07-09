import { IBlog, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IBlogsModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import { Db, Collection, AggregationCursor } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class BlogsRaw extends BaseRaw<IBlog> implements IBlogsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IBlog>>) {
		console.log('col name ', getCollectionName('blog', true));
		super(db, getCollectionName('blog', true), trash);
	}

	getBlogsWithComments(limit = 10): AggregationCursor<IBlog> {
		const pipeline = [
			{
				$lookup: {
					from: 'comments',
					as: 'comments',
					let: { post: '$_id' },
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ['$blogId', '$$post'],
								},
							},
						},
						{ $limit: limit },
					],
				},
			},
		];
		return this.col.aggregate(pipeline);
	}
}
