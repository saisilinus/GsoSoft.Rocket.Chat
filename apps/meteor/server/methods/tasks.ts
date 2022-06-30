import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { TaskService } from '../services/task/service';
import { TasksModel } from '../../app/models/server/raw';
import { sampleTasks } from '../../app/models/server/raw/StaticTasks';

Meteor.methods({
	async seed() {
		const result = await TasksModel.insertMany(sampleTasks);
		return result.ops;
	},

	async addTask(params) {
		check(
			params,
			Match.ObjectIncluding({
				title: String,
				description: String,
				type: Match.OneOf('daily', 'longterm', 'achievements'),
				status: Match.OneOf(-1, 0, 1),
				reward: Number,
				sortOrder: Match.Optional(Number),
				endDate: Date,
			}),
		);

		const Tasks = new TaskService();

		const task = await Tasks.create(params);

		return task;
	},

	async deleteTask(taskId) {
		check(taskId, String);

		const Tasks = new TaskService();

		await Tasks.delete(taskId);

		return true;
	},

	async getOneTask(taskId) {
		check(taskId, String);

		const Tasks = new TaskService();

		const task = await Tasks.getTask(taskId);

		return task;
	},

	async getTasks(paginationOptions, queryOptions) {
		check(
			paginationOptions,
			Match.ObjectIncluding({
				offset: Match.Optional(Number),
				count: Match.Optional(Number),
			}),
		);
		check(
			queryOptions,
			Match.ObjectIncluding({
				sort: Match.Optional(Object),
				query: Match.Optional(Object),
			}),
		);

		const Tasks = new TaskService();

		const results = await Tasks.list(paginationOptions, queryOptions).toArray();

		return results;
	},

	async updateTask(taskId, params) {
		check(taskId, String);
		check(
			params,
			Match.ObjectIncluding({
				title: Match.Optional(String),
				description: Match.Optional(String),
				type: Match.Optional(Match.OneOf('daily', 'longterm', 'achievements')),
				status: Match.Optional(Match.OneOf(-1, 0, 1)),
				reward: Match.Optional(Number),
				sortOrder: Match.Optional(Number),
				endDate: Match.Optional(Date),
			}),
		);

		const Tasks = new TaskService();

		const task = await Tasks.update(taskId, params);

		return task;
	},
});
