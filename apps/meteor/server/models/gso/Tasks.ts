import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { TasksRaw } from '../raw/gso';

registerModel('ITasksModel', new TasksRaw(db, trashCollection));
