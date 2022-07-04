import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { IPaginationOptions, IQueryOptions, ITagGroup } from '@rocket.chat/core-typings';

import { TagGroupService } from '../../services/gso';
import { ITagGroupCreateParams, ITagGroupUpdateParams } from '../../sdk/types/ITagGroupService';

Meteor.methods({
	async addTagGroup(params: ITagGroupCreateParams): Promise<ITagGroup> {
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

	async deleteTagGroup(tagGroupId: ITagGroup['_id']): Promise<boolean> {
		check(tagGroupId, String);

		const TagGroups = new TagGroupService();

		await TagGroups.delete(tagGroupId);

		return true;
	},

	async getOneTagGroup(tagGroupId: ITagGroup['_id']): Promise<ITagGroup> {
		check(tagGroupId, String);

		const TagGroups = new TagGroupService();

		const tagGroup = await TagGroups.getTagGroup(tagGroupId);

		return tagGroup;
	},

	async getTagGroups(paginationOptions: IPaginationOptions, queryOptions: IQueryOptions<ITagGroup>): Promise<ITagGroup[]> {
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

		const TagGroups = new TagGroupService();

		const results = await TagGroups.list(paginationOptions, queryOptions).toArray();

		return results;
	},

	async updateTagGroup(tagGroupId: ITagGroup['_id'], params: ITagGroupUpdateParams): Promise<ITagGroup> {
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
