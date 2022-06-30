import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { TagGroupService } from '../services/tagGroup/service';

Meteor.methods({
	async addTagGroup(params) {
		check(
			params,
			Match.ObjectIncluding({
				title: String,
				description: String,
				sortOrder: Number,
			}),
		);

		const TagGroups = new TagGroupService();

		const tagGroup = await TagGroups.create(params);

		return tagGroup;
	},

	async deleteTagGroup(tagGroupId) {
		check(tagGroupId, String);

		const TagGroups = new TagGroupService();

		await TagGroups.delete(tagGroupId);

		return true;
	},

	async getOneTagGroup(tagGroupId) {
		check(tagGroupId, String);

		const TagGroups = new TagGroupService();

		const tagGroup = await TagGroups.getTagGroup(tagGroupId);

		return tagGroup;
	},

	async getTagGroups(paginationOptions, queryOptions) {
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

		const TagGroups = new TagGroupService();

		const results = await TagGroups.list(paginationOptions, queryOptions).toArray();

		return results;
	},

	async updateTagGroup(tagGroupId, params) {
		check(tagGroupId, String);
		check(
			params,
			Match.ObjectIncluding({
				title: Match.Optional(String),
				description: Match.Optional(String),
				sortOrder: Match.Optional(Number),
			}),
		);

		const TagGroups = new TagGroupService();

		const tagGroup = await TagGroups.update(tagGroupId, params);

		return tagGroup;
	},
});
