import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface ITagGroup extends IRocketChatRecord {
	title: string;
	createdAt: Date;
	description: string;
	sortOrder: number;
}
