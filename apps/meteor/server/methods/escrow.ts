import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { EscrowService } from '../services/escrow/service';
import { IEscrowCreateParams, IEscrow, IEscrowUpdateParams } from '../../definition/IEscrow';
import { Users } from '../../app/models/server';
import { EscrowsModel } from '../../app/models/server/raw';

Meteor.methods({
	getConfig() {
		const employerConfig = {
			id: 'employer',
			cmpClass: 'EmployerRoleFormCmp',
			show: false,
			cmpConfig: {
				rank1: 50,
				rank2: 100,
				rank3: 200,
			},
		};

		const employeeConfig = {
			id: 'employee',
			show: false,
			cmpClass: 'EmployeeRoleFormCmp',
			cmpConfig: {
				escrow: 50,
			},
		};

		const brokerConfig = {
			id: 'broker',
			show: false,
			cmpClass: 'BrokerRoleFormCmp',
			cmpConfig: {
				escrow: 80,
			},
		};

		const broker2Config = {
			id: 'broker2',
			show: true,
			cmpClass: 'Broker2RoleFormCmp',
			cmpConfig: {
				escrow: 80,
			},
		};

		const broker3Config = {
			id: 'broker3',
			show: false,
			cmpConfig: {
				escrow: 80,
			},
		};
		return [employerConfig, employeeConfig, brokerConfig, broker2Config, broker3Config];
	},
	async addEscrow(params: IEscrowCreateParams) {
		check(
			params,
			Match.ObjectIncluding({
				amount: Number,
				type: String,
			}),
		);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		const Escrows = new EscrowService();

		const duplicate = await Escrows.findByUserId(Meteor.userId() as string);

		if (duplicate) {
			throw new Meteor.Error('duplicate-escrow', 'Users can only create one escrow');
		}

		const escrow = await Escrows.create({
			...params,
			userId: Meteor.userId() as string,
		});

		const query = { _id: Meteor.userId() };
		const updateData = { role: params.type };
		await Users.update(query, { $set: updateData, $inc: { credit: -params.amount } });

		return escrow;
	},

	async deleteEscrow(escrowId: IEscrow['_id']) {
		check(escrowId, String);

		const Escrows = new EscrowService();

		await Escrows.delete(escrowId);

		return true;
	},

	async reset() {
		await EscrowsModel.deleteMany({});
	},

	async getOneEscrow(escrowId: IEscrow['_id']) {
		check(escrowId, String);

		const Escrows = new EscrowService();

		const escrow = await Escrows.getEscrow(escrowId);

		return escrow;
	},

	async updateEscrow(escrowId: IEscrow['_id'], params: IEscrowUpdateParams) {
		check(escrowId, String);
		check(
			params,
			Match.ObjectIncluding({
				startDate: Match.Optional(Date),
				endDate: Match.Optional(Number),
				amount: Match.Optional(Number),
				approvedBy: Match.Optional(String),
				type: Match.Optional(String),
				status: Match.Optional(Match.OneOf('submitted', 'returned', 'cancelling', 'frozen', 'closed')),
			}),
		);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		const Escrows = new EscrowService();

		const escrow = await Escrows.update(escrowId, { ...params, userId: Meteor.userId() as string });

		return escrow;
	},

	async getEscrows(paginationOptions, queryOptions) {
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

		const Escrows = new EscrowService();

		const results = await Escrows.list(paginationOptions, {
			sort: queryOptions.sort,
			query: { ...queryOptions.query, userId: Meteor.userId() as string },
		}).toArray();

		return results;
	},
});
