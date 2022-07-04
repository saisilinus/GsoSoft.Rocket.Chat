import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { ITransaction } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { TransactionService } from '../../services/gso';
import { ITransactionCreateParams, ITransactionUpdateParams } from '../../sdk/types/ITransactionService';

/**
 * All fund related method exposed to client side
 */
Meteor.methods({
	// Mock server
	// TODO: automatic generation of quantity from amount
	async buyCredit(params: ITransactionCreateParams) {
		const nonce = Math.floor(Math.random() * 10);
		check(
			params,
			Match.ObjectIncluding({
				gateway: String,
				quantity: Number,
				amount: Number,
				currency: String,
			}),
		);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		if (nonce < 8) {
			const query = { _id: Meteor.userId() as string };
			await Users.update(query, { $inc: { credit: params.quantity } });
		}

		const Transactions = new TransactionService();

		const transaction = await Transactions.create({
			...params,
			status: nonce < 8 ? 'success' : 'error',
			createdBy: Meteor.userId() as string,
		});

		return transaction;
	},

	// To be used in future when migrating to real APIs
	async addTransaction(params: ITransactionCreateParams) {
		check(
			params,
			Match.ObjectIncluding({
				gateway: String,
				quantity: Number,
				amount: Number,
				currency: String,
				status: Match.OneOf('success', 'cancelled', 'error'),
			}),
		);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		const Transactions = new TransactionService();

		const transaction = await Transactions.create({
			...params,
			createdBy: Meteor.userId() as string,
		});

		return transaction;
	},

	async deleteTransaction(transactionId: ITransaction['_id']) {
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

	async updateTransaction(transactionId: ITransaction['_id'], params: ITransactionUpdateParams) {
		check(transactionId, String);
		check(
			params,
			Match.ObjectIncluding({
				gateway: Match.Optional(String),
				quantity: Match.Optional(Number),
				amount: Match.Optional(Number),
				currency: Match.Optional(String),
				status: Match.Optional(Match.OneOf('success', 'cancelled', 'error')),
				gatewayData: Match.Optional(
					Match.ObjectIncluding({
						gateway: Match.Optional(String),
						quantity: Match.Optional(Number),
						amount: Match.Optional(Number),
						currency: Match.Optional(String),
					}),
				),
			}),
		);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		const Transactions = new TransactionService();

		const transaction = await Transactions.update(transactionId, { ...params, updatedBy: Meteor.userId() as string });

		return transaction;
	},

	async getTransactions(paginationOptions, queryOptions) {
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

		const Transactions = new TransactionService();

		const results = await Transactions.list(paginationOptions, {
			sort: queryOptions.sort,
			query: { ...queryOptions.query, createdBy: Meteor.userId() as string },
		}).toArray();

		return results;
	},
});
