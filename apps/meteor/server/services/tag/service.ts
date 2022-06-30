import { AggregationCursor, Cursor } from 'mongodb';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import { ITagService, ITagCreateParams, ITag, ITagUpdateBody, ITagUpdateParams } from '../../../definition/ITag';
import { TagsRaw } from '../../../app/models/server/raw/Tags';
import { IPaginationOptions, IQueryOptions } from '../../../definition/ITeam';
import { CreateObject } from '../../../definition/ICreate';
import { UpdateObject } from '../../../definition/IUpdate';
import { InsertionModel } from '../../../app/models/server/raw/BaseRaw';
import { TagsModel } from '../../../app/models/server/raw';

export class TagService extends ServiceClassInternal implements ITagService {
	protected name = 'tag';

	private TagModel: TagsRaw = TagsModel;

	async create(params: ITagCreateParams): Promise<ITag> {
		const createData: InsertionModel<ITag> = {
			...new CreateObject(),
			...params,
		};
		const result = await this.TagModel.insertOne(createData);
		const tag = await this.TagModel.findOneById(result.insertedId);
		if (!tag) throw new Error('tag-does-not-exist');
		return tag;
	}

	async delete(tagId: string): Promise<void> {
		await this.getTag(tagId);
		await this.TagModel.removeById(tagId);
	}

	async getTag(tagId: string): Promise<ITag> {
		const tag = await this.TagModel.findOneById(tagId);
		if (!tag) throw new Error('tag-does-not-exist');
		return tag;
	}

	async update(tagId: string, params: ITagUpdateParams): Promise<ITag> {
		await this.getTag(tagId);
		const query = {
			_id: tagId,
		};
		const updateData: ITagUpdateBody = {
			...new UpdateObject(),
			...params,
		};
		const result = await this.TagModel.updateOne(query, { $set: updateData });
		const tag = await this.TagModel.findOneById(result.upsertedId._id.toHexString());
		if (!tag) throw new Error('tag-does-not-exist');
		return tag;
	}

	list(
		{ offset, count }: IPaginationOptions = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<ITag> = { sort: {} },
	): Cursor<ITag> {
		return this.TagModel.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}

	listByCategory(limit?: number | undefined): AggregationCursor<ITag> {
		return this.TagModel.getTagsByCategory(limit);
	}
}
