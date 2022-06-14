import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { GatewayService } from '../services/gateway/service';

Meteor.methods({
	getStaticGateways() {
		const PerfectMoneyVoucher = {
			_id: 'perfect-money-voucher',
			show: false,
			active: true,
			sortOrder: 1,
			icon: 'voucher',
			cmpClass: 'PerfectMoneyVoucherFormCmp',
		};

		const BankTransfer = {
			_id: 'bank-transfer',
			show: false,
			active: true,
			sortOrder: 2,
			icon: 'bank',
			cmpClass: 'BankTransferFormCmp',
		};

		const UsdtBlockChain = {
			_id: 'usdt-blockchain',
			show: false,
			active: true,
			sortOrder: 3,
			icon: 'usdt',
			cmpClass: 'UsdtBlockChainFormCmp',
		};

		const CreditCard = {
			_id: 'credit-card',
			show: false,
			active: true,
			sortOrder: 4,
			icon: 'card',
			cmpClass: '',
		};

		const PaypalClass = {
			_id: 'paypal',
			show: true,
			active: true,
			sortOrder: 5,
			icon: 'paypal-icon',
			cmpClass: 'PaypalClassFormCmp',
		};

		return [PerfectMoneyVoucher, BankTransfer, UsdtBlockChain, CreditCard, PaypalClass]
	},
	async addGateway(params) {
		check(
			params,
			Match.ObjectIncluding({
				_id: String,
				show: Boolean,
				active: Boolean,
				sortOrder: Number,
				icon: String,
				cmpClass: Match.Optional(String),
				cmpConfig: Match.Optional(Object),
			}),
		);

		const Gateways = new GatewayService();

		const gateway = await Gateways.create(params);

		return gateway;
	},

	async deleteGateway(gatewayId) {
		check(gatewayId, String);

		const Gateways = new GatewayService();

		await Gateways.delete(gatewayId);

		return true;
	},

	async getOneGateway(gatewayId) {
		check(gatewayId, String);

		const Gateways = new GatewayService();

		const gateway = await Gateways.getGateway(gatewayId);

		return gateway;
	},

	async getGateways(paginationOptions, queryOptions) {
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

		const Gateways = new GatewayService();

		const results = await Gateways.list(paginationOptions, queryOptions).toArray();

		return results;
	},

	async updateGateway(gatewayId, params) {
		check(gatewayId, String);
		check(
			params,
			Match.ObjectIncluding({
				show: Match.Optional(Boolean),
				active: Match.Optional(Boolean),
				sortOrder: Match.Optional(Number),
				icon: Match.Optional(String),
				cmpClass: Match.Optional(String),
				cmpConfig: Match.Optional(Object),
			}),
		);

		const Gateways = new GatewayService();

		const gateway = await Gateways.update(gatewayId, params);

		return gateway;
	},
});
