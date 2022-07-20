import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { IMediaPost } from '@rocket.chat/core-typings';

import { MediaPostService } from '../../services/gso';
import { IMediaPostCreateParams, IMediaPostUpdateParams } from '../../sdk/types/gso/IMediaPostService';

Meteor.methods({
	async createMediaPost(params: IMediaPostCreateParams): Promise<IMediaPost> {
		check(
			params,
			Match.ObjectIncluding({
				title: String,
				content: String,
				tags: Match.Optional([String]),
			}),
		);

		if (!Meteor.user()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		const MediaPosts = new MediaPostService();

		const blog = await MediaPosts.create({ ...params, createdBy: Meteor.user.name });

		return blog;
	},

	async createManyMediaPosts(blogs: Omit<IMediaPostCreateParams, 'authorId'>[]): Promise<void> {
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}
		const MediaPosts = new MediaPostService();
		const data: IMediaPostCreateParams[] = blogs.map((blog) => ({ ...blog, createdBy: Meteor.user.name }));
		await MediaPosts.createMany(data);
	},

	async deleteMediaPost(blogId: IMediaPost['_id']): Promise<boolean> {
		check(blogId, String);

		const MediaPosts = new MediaPostService();

		await MediaPosts.delete(blogId);

		return true;
	},

	async getMediaPosts(limit?: number): Promise<IMediaPost[]> {
		check(limit, Match.Optional(Number));
		console.log('getMediaPosts begin  ', limit);

		const MediaPosts = new MediaPostService();

		// const result = await MediaPosts.list(limit).toArray();
		const result = await MediaPosts.list(limit).toArray();
		console.log('getMediaPosts result ', result);

		return result;
	},

	async getOneMediaPost(blogId: IMediaPost['_id']): Promise<IMediaPost> {
		check(blogId, String);

		const MediaPosts = new MediaPostService();

		const blog = await MediaPosts.getMediaPost(blogId);

		return blog;
	},

	async updateMediaPost(blogId: IMediaPost['_id'], params: IMediaPostUpdateParams): Promise<IMediaPost> {
		check(blogId, String);
		check(
			params,
			Match.ObjectIncluding({
				title: Match.Optional(String),
				authorId: Match.Optional(String),
				tags: Match.Optional([String]),
				content: Match.Optional(String),
			}),
		);

		const MediaPosts = new MediaPostService();

		const blog = await MediaPosts.update(blogId, params);

		return blog;
	},
});
