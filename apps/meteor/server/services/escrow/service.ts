import { Cursor } from 'mongodb';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import { IEscrowService, IEscrowCreateParams, IEscrow, IEscrowUpdateParams } from '../../../definition/IEscrow';
import { IPaginationOptions, IQueryOptions } from '../../../definition/ITeam';
import { InsertionModel } from '../../../app/models/server/raw/BaseRaw';
import { EscrowsModel } from '../../../app/models/server/raw';
import { EscrowsRaw } from '../../../app/models/server/raw/Escrows';

export class EscrowService extends ServiceClassInternal implements IEscrowService {
	protected name = 'escrow';

	private EscrowModel: EscrowsRaw = EscrowsModel;

	async create(params: IEscrowCreateParams): Promise<IEscrow> {
		const createData: InsertionModel<IEscrow> = {
			...params,
			startDate: new Date(),
			endDate: -1,
			approvedBy: '',
			status: 'submitted',
		};
		const result = await this.EscrowModel.insertOne(createData);
		return this.EscrowModel.findOneById(result.insertedId);
	}

	async delete(gatewayId: string): Promise<void> {
		await this.getEscrow(gatewayId);
		await this.EscrowModel.removeById(gatewayId);
	}

	async getEscrow(gatewayId: string): Promise<IEscrow> {
		const gateway = await this.EscrowModel.findOneById(gatewayId);
		if (!gateway) {
			throw new Error('gateway-does-not-exist');
		}
		return gateway;
	}

	async update(gatewayId: string, params: IEscrowUpdateParams): Promise<IEscrow> {
		await this.getEscrow(gatewayId);
		const query = {
			_id: gatewayId,
		};
		const updateData = {
			...params,
		};
		const result = await this.EscrowModel.updateOne(query, { $set: updateData });
		return this.EscrowModel.findOneById(result.upsertedId._id.toHexString());
	}

	list(
		{ offset, count }: IPaginationOptions = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<IEscrow> = { sort: {} },
	): Cursor<IEscrow> {
		return this.EscrowModel.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
