import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { GamesRaw } from '../raw/gso';

registerModel('IGamesModel', new GamesRaw(db, trashCollection));
