import type { ITagGroup } from './ITagGroup';
import type { IUser } from '../IUser';
import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface ITag extends IRocketChatRecord {
	title: string;
	createdAt: Date;
	description: string;
	rank: number;
	createdBy: IUser['_id'];
	category: ITagGroup['_id'];
}
