import { Cursor } from 'mongodb';

import { AtLeastOne } from './AtLeastOne';
import { IRocketChatRecord } from './IRocketChatRecord';
import { IPaginationOptions, IQueryOptions } from './ITeam';
import { IUser } from './IUser';

export interface IEscrow extends IRocketChatRecord {
	userId: IUser['_id'];
	amount: number;
	startDate: Date;
	endDate: number;
	approvedBy: string;
	type: string;
	status: 'submitted' | 'returned' | 'cancelling' | 'frozen' | 'closed';
}

export type IEscrowLean = Omit<IEscrow, '_id' | '_updatedAt'>;

export type IEscrowCreateParams = Omit<IEscrow, '_id' | '_updatedAt' | 'startDate' | 'endDate' | 'approvedBy' | 'status'>;

export type IEscrowUpdateParams = AtLeastOne<IEscrowLean>;

export interface IEscrowService {
	create(params: IEscrowCreateParams): Promise<IEscrow>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<IEscrow>): Cursor<IEscrow>;
	update(EscrowId: IEscrow['_id'], params: IEscrowUpdateParams): Promise<IEscrow>;
	delete(EscrowId: IEscrow['_id']): Promise<void>;
	getEscrow(EscrowId: IEscrow['_id']): Promise<IEscrow>;
	findByUserId(userId: IEscrow['userId']): Promise<IEscrow | null>;
}
