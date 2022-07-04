import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { TagGroupService } from '../services/gso';

if (Meteor.isServer) {
	const TagGroups = new TagGroupService();

	Meteor.publish('tagGroups.getList', function (paginationOptions, queryOptions) {
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

		return TagGroups.list(paginationOptions, queryOptions);
	});
}
