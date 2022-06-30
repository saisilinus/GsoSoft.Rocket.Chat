import { Cursor } from 'mongodb';

import { IRocketChatRecord } from './IRocketChatRecord';
import { IPaginationOptions, IQueryOptions } from './ITeam';

export interface ITagGroup extends IRocketChatRecord {
	title: string;
	createdAt: Date;
	description: string;
	sortOrder: number;
}

export type ITagGroupWithoutID = Omit<ITagGroup, '_id'>;

export type ITagGroupLean = Omit<ITagGroup, 'createdAt' | '_updatedAt' | '_id'>;

export type ITagGroupCreateParams = Omit<ITagGroup, 'createdAt' | '_updatedAt' | '_id'>;

export type ITagGroupUpdateParams = Partial<ITagGroupLean>;

export type ITagGroupUpdateBody = ITagGroupUpdateParams & { _updatedAt: ITagGroup['_updatedAt'] };

export interface ITagGroupService {
	create(params: ITagGroupCreateParams): Promise<ITagGroup>;
	list(paginationOptions?: IPaginationOptions, queryOptions?: IQueryOptions<ITagGroup>): Cursor<ITagGroup>;
	update(tagId: string, params: ITagGroupUpdateParams): Promise<ITagGroup>;
	delete(tagId: string): Promise<void>;
	getTagGroup(tagId: string): Promise<ITagGroup>;
}
