import type { IPost } from './IPost';
import type { IBlog } from './IBlog';

export interface IComment extends IPost {
	blogId: IBlog['_id'];
	parentId: IPost['_id'];
}
