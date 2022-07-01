import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { TaskService } from '../services/task/service';
import { TasksModel } from '../../app/models/server/raw';
import { sampleTasks } from '../../app/models/server/raw/StaticTasks';
import { Users } from '../../../app/models/server/raw';
import {
	IDeposit,
	ISendFund, IUser,
	IWithdraw,
} from '@rocket.chat/core-typings';

/**
 * All fund related method exposed to client side
 */
Meteor.methods({
	'fund.deposit'(params: IDeposit) {
		const nonce = Math.floor(Math.random() * 10);
		// 1. validating data
		check(
			params,
			Match.ObjectIncluding({
				gateway: String,
				quantity: Number,
				amount: Number,
				currency: String,
			}),
		);

		// 2. validating user
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		if (nonce < 8) {
			const query = { _id: Meteor.userId() };
			await Users.update(query, { $inc: { credit: params.quantity } });
		}

		// delegate to gateway adapter

		// update transaction table

		const Transactions = new TransactionService();

		const transaction = await Transactions.create({
			...params,
			status: nonce < 8 ? 'success' : 'error',
			createdBy: Meteor.userId(),
		});

		return transaction;
	},

	'fund.withdraw'(params: IWithdraw) {
		const nonce = Math.floor(Math.random() * 10);
		// 1. validating data
		check(
			params,
			Match.ObjectIncluding({
				gateway: String,
				quantity: Number,
				amount: Number,
				currency: String,
			}),
		);

		// 2. validating user
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		if (nonce < 8) {
			const query = { _id: Meteor.userId() };
			await Users.update(query, { $inc: { credit: params.quantity } });
		}

		// delegate to gateway adapter

		// update transaction table


		return null;
	},


	'fund.send'(params: ISendFund) {
		return null;
	},

	'fund.getUserFund'(userId: IUser['_id']) {
		console.log(userId);
		return userId;
	},


	async getTransactions(paginationOptions, queryOptions) {
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

		const Transactions = new TransactionService();

		const results = await Transactions.list(paginationOptions, {
			sort: queryOptions.sort,
			query: { ...queryOptions.query, createdBy: Meteor.userId() },
		}).toArray();

		return results;
	},

	async markTransactionAudited(transactionId: ITransaction['_id']) {
		check(transactionId, String);

		const Transactions = new TransactionService();

		await Transactions.delete(transactionId);

		return true;
	},

	async getOneTransaction(transactionId: ITransaction['_id']) {
		check(transactionId, String);

		const Transactions = new TransactionService();

		const transaction = await Transactions.getTransaction(transactionId);

		return transaction;
	},


});
