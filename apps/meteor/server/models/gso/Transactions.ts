import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { TransactionsRaw } from '../raw/gso';

registerModel('ITransactionsModel', new TransactionsRaw(db, trashCollection));
