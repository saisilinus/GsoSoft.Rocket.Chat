import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { TagsRaw } from '../raw/gso';

registerModel('ITagsModel', new TagsRaw(db, trashCollection));
