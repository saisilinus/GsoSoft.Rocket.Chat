import { IBlog, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IBlogsModel } from '@rocket.chat/model-typings';
import { Db, Collection, AggregationCursor } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class BlogsRaw extends BaseRaw<IBlog> implements IBlogsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IBlog>>) {
		// console.log('col name ', getCollectionName('blogs', true));
		super(db, 'blogs', trash);
	}

	getBlogsWithComments(limit = 10): AggregationCursor<IBlog> {
		const pipeline = [
			{
				$lookup: {
					from: 'gso_comments',
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
		console.log(this.col.countDocuments());
		console.log(this.col.collectionName);
		console.log(this.col.dbName);
		console.log(this.col.find({}));
		return this.col.aggregate(pipeline);
		// return this.col.find({ } });
	}
}
