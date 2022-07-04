import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { TransactionService } from '../services/gso';

if (Meteor.isServer) {
	const Transactions = new TransactionService();

	Meteor.publish('transactions.getList', function (paginationOptions, queryOptions) {
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

		return Transactions.list(paginationOptions, {
			sort: queryOptions.sort,
			query: { ...queryOptions.query, createdBy: Meteor.userId() as string },
		});
	});
}
