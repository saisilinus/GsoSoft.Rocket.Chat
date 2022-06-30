import type { IFundTransaction } from './IFundTransaction';
import type { IUser } from '../IUser';

export interface IPurchase extends IFundTransaction {
	toAccount: IUser['_id'];
}
