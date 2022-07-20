import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../database/trash';
import { db } from '../database/utils';
import { BlogsRaw } from './raw/gso';
import { FundBalancesRaw } from './raw/gso/FundBalances';
import { FundTransactionsRaw } from './raw/gso/FundTransactions';

registerModel('IBlogsModel', new BlogsRaw(db, trashCollection));
registerModel('IFundBalancesModel', new FundBalancesRaw(db, trashCollection));
registerModel('IFundTransactionsModel', new FundTransactionsRaw(db, trashCollection));
