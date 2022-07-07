import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IProduct extends IRocketChatRecord {
	createdAt: Date;
	title: string;
	description: string;
	price: number;
	ranking: number;
}
