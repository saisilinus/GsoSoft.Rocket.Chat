import type { IRocketChatRecord } from '../IRocketChatRecord';
import type { IUser } from '../IUser';

export interface IPost extends IRocketChatRecord {
	createdAt: Date;
	authorId: IUser['_id'];
	content: string;
}
