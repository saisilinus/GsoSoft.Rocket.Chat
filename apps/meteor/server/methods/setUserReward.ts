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
		const daysBetweenLogins = user.lastSeen ? new Date().getDate() - user.lastSeen.getDate() : 0;
		if (daysBetweenLogins === 0) {
			await Users.update(query, { $set: { lastSeen: new Date() } });
			return { showModal: false, consecutiveLogins: user.consecutiveLogins };
		} else if (daysBetweenLogins === 1) {
			await Users.update(query, { $inc: { consecutiveLogins: 1 }, $set: { lastSeen: new Date() } });
			return { showModal: true, consecutiveLogins: user.consecutiveLogins };
		} else {
			await Users.update(query, { $set: { consecutiveLogins: 1, lastSeen: new Date() } });
			return { showModal: 'reset', consecutiveLogins: user.consecutiveLogins };
		}
	},
});
