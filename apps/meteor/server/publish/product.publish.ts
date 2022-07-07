import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { ProductService } from '../services/gso';

if (Meteor.isServer) {
	const Products = new ProductService();

	Meteor.publish('products.getList', function (paginationOptions, queryOptions) {
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

		return Products.list(paginationOptions, queryOptions);
	});
}
