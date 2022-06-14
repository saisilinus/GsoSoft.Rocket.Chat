import { Meteor } from 'meteor/meteor';

import { Users } from '../../app/models/server';

Meteor.methods({
	// Mock trust score
	async setRandomTrustScore() {
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}
		const query = { _id: Meteor.userId() };
		const updateData = { trustScore: Math.round(Math.random() * 10) / 10 };
		await Users.update(query, { $set: updateData });
		return Users.findOneById(Meteor.userId());
	},
});
