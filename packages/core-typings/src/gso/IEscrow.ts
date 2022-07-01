import type { IFundTransaction } from './IFundTransaction';
import type { IUser } from '../IUser';

export interface IEscrow extends IFundTransaction {
	startDate: Date;
	endDate: Date;
	approvedBy: IUser['_id'];
	type: string;
	status: 'submitted' | 'returned' | 'cancelling' | 'frozen' | 'closed';
}
