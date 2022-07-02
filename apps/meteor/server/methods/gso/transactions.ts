import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { IDeposit, IFundTransaction, ISendFund, IUser, IWithdraw } from '@rocket.chat/core-typings';
import { FundTransactionService } from '../../services/gso/TransactionService';

/**
 * All fund related method exposed to client side
 */
Meteor.methods({
	'transaction.markAudited'(id: IFundTransaction['_id']) {
		console.log(id);
	},

	'transaction.getUserTransactions'(params: IWithdraw) {
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

	'transaction.findList'(paginationOptions, queryOptions) {
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

		const Transactions = new FundTransactionService();

		const results = await Transactions.list(paginationOptions, {
			sort: queryOptions.sort,
			query: { ...queryOptions.query, createdBy: Meteor.userId() },
		}).toArray();

		return results;
	},

	async markTransactionAudited(transactionId: ITransaction['_id']) {
		check(transactionId, String);

		const Transactions = new FundTransactionService();

		await Transactions.delete(transactionId);

		return true;
	},

	async getOneTransaction(transactionId: ITransaction['_id']) {
		check(transactionId, String);

		const Transactions = new FundTransactionService();

		const transaction = await Transactions.getTransaction(transactionId);

		return transaction;
	},


});
