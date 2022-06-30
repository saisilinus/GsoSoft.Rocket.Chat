import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { TagService } from '../services/tag/service';

Meteor.methods({
	async addTag(params) {
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

	async deleteTag(tagId) {
		check(tagId, String);

		const Tags = new TagService();

		await Tags.delete(tagId);

		return true;
	},

	async getOneTag(tagId) {
		check(tagId, String);

		const Tags = new TagService();

		const tag = await Tags.getTag(tagId);

		return tag;
	},

	async getTags(paginationOptions, queryOptions) {
		check(
			paginationOptions,
			Match.ObjectIncluding({
				offset: Match.Optional(Number),
				count: Match.Optional(Number),
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

	async updateTag(tagId, params) {
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
});
