import type { IFundTransaction } from './IFundTransaction';
import type { IUser } from '../IUser';

export interface ISendFund extends IFundTransaction {
	fromAccount: IUser['_id'];
	toAccount: IUser['_id'];

}
