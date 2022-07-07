import { Cursor } from 'mongodb';
import { IGatewayData, ITransaction } from '@rocket.chat/core-typings/dist/gso';
import { Transactions } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';
import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import { ITransactionService, ITransactionCreateParams, ITransactionUpdateParams } from '../../sdk/types/ITransactionService';

const createHash = (length: number): string => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

const createLongRandomNumber = (): string => {
	let foo = '';
	for (let i = 0; i < 19; ++i) foo += Math.floor(Math.random() * 10);
	return foo;
};

export class TransactionService extends ServiceClassInternal implements ITransactionService {
	protected name = 'transaction';

	async create(params: ITransactionCreateParams): Promise<ITransaction> {
		const gatewayData: IGatewayData = {
			gateway: params.gateway,
			quantity: params.quantity,
			amount: params.amount,
			currency: params.currency,
		};
		const createData: InsertionModel<ITransaction> = {
			createdAt: new Date(),
			...params,
			gatewayData,
			hash: createHash(6),
			transactionCode: createLongRandomNumber(),
		};
		const result = await Transactions.insertOne(createData);
		const transaction = await Transactions.findOneById(result.insertedId);
		if (!transaction) throw new Error('transaction-does-not-exist');
		return transaction;
	}

	async createMany(transactions: ITransactionCreateParams[]): Promise<void> {
		const data: InsertionModel<ITransaction>[] = transactions.map((transaction) => ({
			...transaction,
			createdAt: new Date(),
			hash: createHash(6),
			transactionCode: createLongRandomNumber(),
			gatewayData: {
				gateway: transaction.gateway,
				quantity: transaction.quantity,
				amount: transaction.amount,
				currency: transaction.currency,
			},
		}));
		await Transactions.insertMany(data);
	}

	async delete(transactionId: string): Promise<void> {
		await this.getTransaction(transactionId);
		await Transactions.removeById(transactionId);
	}

	async getTransaction(transactionId: string): Promise<ITransaction> {
		const transaction = await Transactions.findOneById(transactionId);
		if (!transaction) throw new Error('transaction-does-not-exist');
		return transaction;
	}

	async update(transactionId: string, params: ITransactionUpdateParams): Promise<ITransaction> {
		await this.getTransaction(transactionId);
		const query = {
			_id: transactionId,
		};
		const updateData = {
			...params,
		};
		const result = await Transactions.updateOne(query, { $set: updateData });
		const transaction = await Transactions.findOneById(result.upsertedId._id.toHexString());
		if (!transaction) throw new Error('transaction-does-not-exist');
		return transaction;
	}

	list(
		{ offset, count }: Partial<IPaginationOptions> = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<ITransaction> = { sort: {} },
	): Cursor<ITransaction> {
		return Transactions.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
