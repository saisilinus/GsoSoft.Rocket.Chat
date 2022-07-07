import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { IGame, IPaginationOptions, IQueryOptions } from '@rocket.chat/core-typings';

import { GameService } from '../../services/gso';
import { IGameCreateParams, IGameUpdateParams } from '../../sdk/types/IGameService';

Meteor.methods({
	async createGame(params: IGameCreateParams): Promise<IGame> {
		check(
			params,
			Match.ObjectIncluding({
				title: String,
				description: String,
				ranking: Match.Optional(Number),
				tags: Match.Optional([String]),
			}),
		);

		const Games = new GameService();

		const game = await Games.create(params);

		return game;
	},

	async deleteGame(gameId: IGame['_id']): Promise<boolean> {
		check(gameId, String);

		const Games = new GameService();

		await Games.delete(gameId);

		return true;
	},

	async getGames(paginationOptions: IPaginationOptions, queryOptions: IQueryOptions<IGame>): Promise<IGame[]> {
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

		const Games = new GameService();

		const results = await Games.list(paginationOptions, queryOptions).toArray();

		return results;
	},

	async getOneGame(gameId: IGame['_id']): Promise<IGame> {
		check(gameId, String);

		const Games = new GameService();

		const game = await Games.getGame(gameId);

		return game;
	},

	async updateGame(gameId: IGame['_id'], params: IGameUpdateParams): Promise<IGame> {
		check(gameId, String);
		check(
			params,
			Match.ObjectIncluding({
				title: Match.Optional(String),
				description: Match.Optional(String),
				tags: Match.Optional([String]),
				ranking: Match.Optional(Number),
			}),
		);

		const Games = new GameService();

		const game = await Games.update(gameId, params);

		return game;
	},
});
