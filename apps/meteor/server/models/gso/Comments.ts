import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { CommentsRaw } from '../raw/gso';

registerModel('ICommentsModel', new CommentsRaw(db, trashCollection));
