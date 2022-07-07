import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { EscrowsRaw } from '../raw/gso';

registerModel('IEscrowsModel', new EscrowsRaw(db, trashCollection));
