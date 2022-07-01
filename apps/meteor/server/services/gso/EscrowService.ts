import { Escrows } from '@rocket.chat/models';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import { IEscrowService, IEscrowCreateParams, IEscrow, IEscrowUpdateParams } from '../../../definition/IEscrow';
import { IPaginationOptions, IQueryOptions } from '../../../definition/ITeam';
import { EscrowsModel } from '../../../app/models/server/raw';

export class EscrowService extends ServiceClassInternal implements IEscrowService {
	protected name = 'escrow';

	async getById(escrowId: string): Promise<null | IEscrow> {
		return Escrows.findOneById(escrowId);
	}

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

	async delete(escrowId: string): Promise<void> {
		await this.getEscrow(escrowId);
		await this.EscrowModel.removeById(escrowId);
	}

	async getEscrow(escrowId: string): Promise<IEscrow> {
		const escrow = await this.EscrowModel.findOneById(escrowId);
		if (!escrow) {
			throw new Error('escrow-does-not-exist');
		}
		return escrow;
	}

	async update(escrowId: string, params: IEscrowUpdateParams): Promise<IEscrow> {
		await this.getEscrow(escrowId);
		const query = {
			_id: escrowId,
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

	async findByUserId(userId: IEscrow['userId']): Promise<IEscrow | null> {
		return this.EscrowModel.findOne({ userId });
	}
}
