import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { GatewaysRaw } from '../raw/gso';

registerModel('IGatewaysModel', new GatewaysRaw(db, trashCollection));
