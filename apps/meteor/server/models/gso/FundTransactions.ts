import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { FundTransactionsRaw } from '../raw/gso/FundTransactionsRaw';

registerModel('IFundTransactionsModel', new FundTransactionsRaw(db, trashCollection));
