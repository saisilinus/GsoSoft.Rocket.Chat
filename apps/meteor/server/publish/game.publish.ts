import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { GameService } from '../services/gso';

if (Meteor.isServer) {
	const Games = new GameService();

	Meteor.publish('games.getList', function (paginationOptions, queryOptions) {
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

		return Games.list(paginationOptions, queryOptions);
	});
}
