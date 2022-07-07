import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { IComment } from '@rocket.chat/core-typings';

import { CommentService } from '../../services/gso';
import { ICommentCreateParams, ICommentUpdateParams } from '../../sdk/types/ICommentService';

Meteor.methods({
	async addComment(params: ICommentCreateParams): Promise<IComment> {
		check(
			params,
			Match.ObjectIncluding({
				content: String,
				blogId: String,
				parentId: String,
			}),
		);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user');
		}

		const Comments = new CommentService();

		const comment = await Comments.create({ ...params, authorId: Meteor.userId() as string });

		return comment;
	},

	async deleteComment(commentId: IComment['_id']): Promise<boolean> {
		check(commentId, String);

		const Comments = new CommentService();

		await Comments.delete(commentId);

		return true;
	},

	async updateComment(commentId: IComment['_id'], params: ICommentUpdateParams): Promise<IComment> {
		check(commentId, String);
		check(
			params,
			Match.ObjectIncluding({
				authorId: Match.Optional(String),
				content: Match.Optional(String),
				blogId: Match.Optional(String),
				parentId: Match.Optional(String),
			}),
		);

		const Comments = new CommentService();

		const comment = await Comments.update(commentId, params);

		return comment;
	},
});
