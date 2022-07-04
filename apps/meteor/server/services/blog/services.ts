import { AggregationCursor } from 'mongodb';
import { IBlog } from '@rocket.chat/core-typings/dist/gso';
import { Blogs } from '@rocket.chat/models';
import { InsertionModel } from '@rocket.chat/model-typings';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import { IBlogService, IBlogCreateParams, IBlogUpdateParams } from '../../sdk/types/IBlogService';

export class BlogService extends ServiceClassInternal implements IBlogService {
	protected name = 'blog';

	async create(params: IBlogCreateParams): Promise<IBlog> {
		const createData: InsertionModel<IBlog> = {
			...params,
			...(params.tags ? { tags: params.tags } : { tags: [] }),
			createdAt: new Date(),
		};
		const result = await Blogs.insertOne(createData);
		const blog = await Blogs.findOneById(result.insertedId);
		if (!blog) throw new Error('blog-does-not-exist');
		return blog;
	}

	async delete(blogId: string): Promise<void> {
		await this.getBlog(blogId);
		await Blogs.removeById(blogId);
	}

	async getBlog(blogId: string): Promise<IBlog> {
		const blog = await Blogs.findOneById(blogId);
		if (!blog) {
			throw new Error('blog-does-not-exist');
		}
		return blog;
	}

	async update(blogId: string, params: IBlogUpdateParams): Promise<IBlog> {
		await this.getBlog(blogId);
		const query = {
			_id: blogId,
		};
		const updateData = {
			...params,
		};
		const result = await Blogs.updateOne(query, { $set: updateData });
		const blog = await Blogs.findOneById(result.upsertedId._id.toHexString());
		if (!blog) throw new Error('blog-does-not-exist');
		return blog;
	}

	list(limit = 10): AggregationCursor<IBlog> {
		return Blogs.getBlogsWithComments(limit);
	}
}
