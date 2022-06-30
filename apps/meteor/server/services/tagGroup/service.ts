import { Cursor } from 'mongodb';

import { ServiceClassInternal } from '../../sdk/types/ServiceClass';
import {
	ITagGroupService,
	ITagGroupCreateParams,
	ITagGroup,
	ITagGroupUpdateBody,
	ITagGroupUpdateParams,
} from '../../../definition/ITagGroup';
import { TagGroupsRaw } from '../../../app/models/server/raw/TagGroups';
import { IPaginationOptions, IQueryOptions } from '../../../definition/ITeam';
import { CreateObject } from '../../../definition/ICreate';
import { UpdateObject } from '../../../definition/IUpdate';
import { InsertionModel } from '../../../app/models/server/raw/BaseRaw';
import { TagGroupsModel } from '../../../app/models/server/raw';

export class TagGroupService extends ServiceClassInternal implements ITagGroupService {
	protected name = 'tagGroup';

	private TagGroupModel: TagGroupsRaw = TagGroupsModel;

	async create(params: ITagGroupCreateParams): Promise<ITagGroup> {
		const createData: InsertionModel<ITagGroup> = {
			...new CreateObject(),
			...params,
		};
		const result = await this.TagGroupModel.insertOne(createData);
		const tagGroup = await this.TagGroupModel.findOneById(result.insertedId);
		if (!tagGroup) throw new Error('tagGroup-does-not-exist');
		return tagGroup;
	}

	async delete(tagGroupId: string): Promise<void> {
		await this.getTagGroup(tagGroupId);
		await this.TagGroupModel.removeById(tagGroupId);
	}

	async getTagGroup(tagGroupId: string): Promise<ITagGroup> {
		const tagGroup = await this.TagGroupModel.findOneById(tagGroupId);
		if (!tagGroup) throw new Error('tagGroup-does-not-exist');
		return tagGroup;
	}

	async update(tagGroupId: string, params: ITagGroupUpdateParams): Promise<ITagGroup> {
		await this.getTagGroup(tagGroupId);
		const query = {
			_id: tagGroupId,
		};
		const updateData: ITagGroupUpdateBody = {
			...new UpdateObject(),
			...params,
		};
		const result = await this.TagGroupModel.updateOne(query, { $set: updateData });
		const tagGroup = await this.TagGroupModel.findOneById(result.upsertedId._id.toHexString());
		if (!tagGroup) throw new Error('tagGroup-does-not-exist');
		return tagGroup;
	}

	list(
		{ offset, count }: IPaginationOptions = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<ITagGroup> = { sort: {} },
	): Cursor<ITagGroup> {
		return this.TagGroupModel.find(
			{ ...query },
			{
				...(sort && { sort }),
				limit: count,
				skip: offset,
			},
		);
	}
}
