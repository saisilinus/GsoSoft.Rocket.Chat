import { IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';
import { ITag } from '@rocket.chat/core-typings/src/gso';
import { Cursor, AggregationCursor } from 'mongodb';

export type ITagWithoutID = Omit<ITag, '_id'>;

export type ITagLean = Omit<ITag, 'createdAt' | '_updatedAt' | '_id'>;

export type ITagCreateParams = Omit<ITag, 'createdAt' | '_updatedAt' | '_id'>;

export type ITagUpdateParams = Partial<ITagLean>;

export type ITagUpdateBody = ITagUpdateParams & { _updatedAt: ITag['_updatedAt'] };

export interface ITagService {
	create(params: ITagCreateParams): Promise<ITag>;
	createMany(tags: ITagCreateParams[]): Promise<void>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<ITag>): Cursor<ITag>;
	update(tagId: string, params: ITagUpdateParams): Promise<ITag>;
	delete(tagId: string): Promise<void>;
	getTag(tagId: string): Promise<ITag>;
	listByCategory(limit?: number): AggregationCursor<ITag>;
}
