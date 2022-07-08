import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { TagService } from '../services/gso';

if (Meteor.isServer) {
	const Tags = new TagService();

	Meteor.publish('tags.getList', function (paginationOptions, queryOptions) {
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

		return Tags.list(paginationOptions, queryOptions);
	});

	Meteor.publish('tags.getListByCategory', function (limit) {
		check(limit, Match.Optional(Number));

		return Tags.listByCategory(limit);
	});
}
