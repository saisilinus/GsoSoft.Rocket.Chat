import type { IFundTransaction } from './IFundTransaction';
import type { IUser } from '../IUser';

export interface IReservation extends IFundTransaction {
	startDate: Date;
	endDate: Date;
	approvedBy: IUser['_id'];
}
