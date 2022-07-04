import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { EscrowService } from '../services/gso';

if (Meteor.isServer) {
	const Escrows = new EscrowService();

	Meteor.publish('escrow.getList', function (paginationOptions, queryOptions) {
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

		return Escrows.list(paginationOptions, {
			sort: queryOptions.sort,
			query: { ...queryOptions.query, userId: Meteor.userId() as string },
		});
	});
}
