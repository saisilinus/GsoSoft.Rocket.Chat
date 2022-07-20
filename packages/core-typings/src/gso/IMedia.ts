import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IMedia extends IRocketChatRecord {
	caption: string;
	images: string[];
	createdBy: string;
	createdAt: Date;
	likes: number;
}
