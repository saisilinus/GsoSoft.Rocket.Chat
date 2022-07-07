import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { TagGroupsRaw } from '../raw/gso';

registerModel('ITagGroupsModel', new TagGroupsRaw(db, trashCollection));
