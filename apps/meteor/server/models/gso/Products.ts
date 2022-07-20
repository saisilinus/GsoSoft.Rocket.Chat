import { registerModel } from '@rocket.chat/models';

import { trashCollection } from '../../database/trash';
import { db } from '../../database/utils';
import { ProductsRaw } from '../raw/gso';

registerModel('IProductsModel', new ProductsRaw(db, trashCollection));
