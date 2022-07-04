import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { IPaginationOptions, IQueryOptions, ITag } from '@rocket.chat/core-typings';

import { TagService } from '../../services/gso';
import { ITagCreateParams, ITagUpdateParams } from '../../sdk/types/ITagService';

Meteor.methods({
	async addTag(params: ITagCreateParams): Promise<ITag> {
		check(
			params,
			Match.ObjectIncluding({
				title: String,
				description: String,
				sortOrder: Number,
				rank: Number,
				category: String,
			}),
		);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		const Tags = new TagService();

		const tag = await Tags.create({ ...params, createdBy: Meteor.userId() as string });

		return tag;
	},

	async deleteTag(tagId: ITag['_id']): Promise<boolean> {
		check(tagId, String);

		const Tags = new TagService();

		await Tags.delete(tagId);

		return true;
	},

	async getOneTag(tagId: ITag['_id']): Promise<ITag> {
		check(tagId, String);

		const Tags = new TagService();

		const tag = await Tags.getTag(tagId);

		return tag;
	},

	async getTags(paginationOptions: IPaginationOptions, queryOptions: IQueryOptions<ITag>): Promise<ITag[]> {
		check(
			paginationOptions,
			Match.ObjectIncluding({
				offset: Number,
				count: Number,
			}),
		);
		check(
			queryOptions,
			Match.ObjectIncluding({
				sort: Match.Optional(Object),
				query: Match.Optional(Object),
			}),
		);

		const Tags = new TagService();

		const results = await Tags.list(paginationOptions, queryOptions).toArray();

		return results;
	},

	async updateTag(tagId: ITag['_id'], params: ITagUpdateParams): Promise<ITag> {
		check(tagId, String);
		check(
			params,
			Match.ObjectIncluding({
				title: Match.Optional(String),
				description: Match.Optional(String),
				sortOrder: Match.Optional(Number),
			}),
		);

		const Tags = new TagService();

		const tag = await Tags.update(tagId, params);

		return tag;
	},

	async listTagsByCategory(limit?: number): Promise<ITag[]> {
		check(limit, Match.Optional(Number));

		const Tags = new TagService();
		const results = await Tags.listByCategory(limit).toArray();

		return results;
	},
});
