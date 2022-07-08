import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { AggregationCursor } from 'mongodb';
import { IBlog } from '@rocket.chat/core-typings';

import { BlogService } from '../services/gso';

if (Meteor.isServer) {
	const Blogs = new BlogService();

	Meteor.publish('blogs.getList', function (limit?: number): AggregationCursor<IBlog> {
		check(limit, Match.Optional(Number));

		return Blogs.list(limit);
	});
}
