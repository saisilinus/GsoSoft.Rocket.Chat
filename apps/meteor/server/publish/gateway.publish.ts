import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { GatewayService } from '../services/gso';

if (Meteor.isServer) {
	const Gateways = new GatewayService();

	Meteor.publish('gateways.getList', function (paginationOptions, queryOptions) {
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

		return Gateways.list(paginationOptions, queryOptions);
	});
}
