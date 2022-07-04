import { IProduct, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IProductsModel } from '@rocket.chat/model-typings';
import { getCollectionName } from '@rocket.chat/models';
import { Db, Collection } from 'mongodb';

import { BaseRaw } from '../BaseRaw';

export class ProductsRaw extends BaseRaw<IProduct> implements IProductsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IProduct>>) {
		super(db, getCollectionName('product'), trash);
	}
}
