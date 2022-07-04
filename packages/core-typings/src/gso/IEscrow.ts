import type { IFundTransaction } from './IFundTransaction';
import type { IUser } from '../IUser';

export interface IEscrow extends IFundTransaction {
	userId: IUser['_id'];
	amount: number;
	startDate: Date;
	endDate: number;
	approvedBy: string;
	type: string;
	status: 'submitted' | 'returned' | 'cancelling' | 'frozen' | 'closed';
}
