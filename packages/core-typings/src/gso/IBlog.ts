import type { ITag } from './ITag';
import type { IPost } from './IPost';
import type { IComment } from './IComment';

export interface IBlog extends IPost {
	title: string;
	tags: ITag['_id'][];
	comments?: IComment[];
}
