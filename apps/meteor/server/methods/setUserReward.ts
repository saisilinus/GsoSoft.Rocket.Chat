import { IUser } from '@rocket.chat/core-typings';
import { Meteor } from 'meteor/meteor';

import { Users } from '../../app/models/server';

Meteor.methods({
	async setUserReward() {
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}
		const query = { _id: Meteor.userId() };
		const user = Users.findOne(query) as IUser;
		const daysBetweenLogins = new Date().getDate() - user.lastSeen.getDate();
		if (daysBetweenLogins === 0) {
			await Users.update(query, { $set: { lastSeen: Date.now() } });
		} else if (daysBetweenLogins === 1) {
			await Users.update(query, { $inc: { consecutiveLogins: 1 }, $set: { lastSeen: Date.now() } });
		} else {
			await Users.update(query, { $set: { consecutiveLogins: 0, lastSeen: Date.now() } });
		}
		return {
			consecutiveLogins: user.consecutiveLogins,
		};
	},
});
