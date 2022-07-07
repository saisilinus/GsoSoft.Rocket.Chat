import type { ITag } from './ITag';
import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IGame extends IRocketChatRecord {
	createdAt: Date;
	title: string;
	description: string;
	tags: ITag['_id'][];
	ranking: number;
}
