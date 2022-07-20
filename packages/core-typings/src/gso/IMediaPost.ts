import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IMediaPost extends IRocketChatRecord {
	caption: string;
	images: string[];
	createdBy: string;
	createdAt: Date;
	likes: number;
}
