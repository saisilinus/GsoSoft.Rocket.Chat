import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import {
	ICurrency,
	IDeposit,
	IExchangeCurrency,
	IFundAccount,
	IFundBalance,
	IFundOwner,
	IFundTransaction,
	ISendFund,
	IWithdraw,
} from '@rocket.chat/core-typings';

import { FundService } from '../../services/gso';

/**
 * All fund related method exposed to client side
 */
Meteor.methods({
	async listCurrencies() {
		const sv = new FundService();

		return sv.listCurrencies(Meteor.userId());
	},

	/**
	 * User decides to deposit an amount of fund. The system check if user is having any pending deposit before, load it or initiate a new one
	 *
	 * @param params
	 */
	async depositFund(params: IDeposit) {
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

		// if (nonce < 8) {
		// 	const query = { _id: Meteor.userId() };
		// 	// await Users.update(query, { $inc: { credit: params.quantity } });
		// }

		//

		// delegate to gateway adapter

		// update transaction table

		const Transactions = new FundService();

		const transaction = await Transactions.create({
			...params,
			status: nonce < 8 ? 'success' : 'error',
			createdBy: Meteor.userId(),
		});

		return transaction;
	},
	withdrawFund(params: IWithdraw) {
		// const nonce = Math.floor(Math.random() * 10);
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

		// if (nonce < 8) {
		// 	const query = { _id: Meteor.userId() };
		// 	await Users.update(query, { $inc: { credit: params.quantity } });
		// }

		// delegate to gateway adapter

		// update transaction table

		return null;
	},

	/**
	 * Allow user to init an currency exchange order. Return fund state before and after.
	 * @param from
	 * @param to
	 */
	async initCurrencyExchange(from: string, to: string, amount: number): Promise<IExchangeCurrency> {
		// 1. verify user data _ryan
		console.log(from, to, amount);

		// 2. send to service layer
		const fundService = new FundService();
		return fundService.initCurrencyExchange(Meteor.userId(), from, to, amount);
	},

	/**
	 * Allow user to init an currency exchange order. Return fund state before and after.
	 * @param from
	 * @param to
	 */
	async submitCurrencyExchange(orderId: IExchangeCurrency['_id']): boolean {
		// 1. verify user data

		// 2. send to service layer
		const fundService = new FundService();
		return fundService.submitCurrencyExchange(orderId);
	},

	sendFund(params: ISendFund) {
		return params;
	},

	getUserFundBalance(owner: IFundOwner): IFundBalance {
		console.log(owner);

		const fundBalance: IFundBalance = {
			owner,
			accounts: [
				{
					currency: 'USD',
					lastTransaction: '5635sdf',
					availableAmount: 10,
					unAvailableAmount: 13,
					lastAmount: 5, // for audit purpose
					lastAudited: new Date(),
				} as IFundAccount,
				{
					currency: 'GSD',
					lastTransaction: '12adf31',
					availableAmount: 55,
					unAvailableAmount: 24,
					lastAmount: 5, // for audit purpose
					lastAudited: new Date(),
				} as IFundAccount,
			],
		} as IFundBalance;

		return fundBalance;
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

		const Transactions = new FundService();

		const results = await Transactions.list(paginationOptions, {
			sort: queryOptions.sort,
			query: { ...queryOptions.query, createdBy: Meteor.userId() },
		}).toArray();

		return results;
	},

	async markTransactionAudited(transactionId: IFundTransaction['_id']) {
		check(transactionId, String);

		const Transactions = new FundService();

		await Transactions.delete(transactionId);

		return true;
	},

	async getOneTransaction(transactionId: IFundTransaction['_id']) {
		check(transactionId, String);

		const Transactions = new FundService();

		const transaction = await Transactions.getTransaction(transactionId);

		return transaction;
	},
});
