import { IUser } from '@rocket.chat/core-typings';

import { Logger } from '../../../logger/server';
import { settings } from '../../../settings/server';
import { Users } from '../../../models/server';
import { hasPermission } from '../../../authorization/server';

const logger = new Logger('getFullUserData');

const defaultFields = {
	name: 1,
	username: 1,
	nickname: 1,
	status: 1,
	utcOffset: 1,
	type: 1,
	active: 1,
	bio: 1,
	reason: 1,
	statusText: 1,
	avatarETag: 1,
	extension: 1,
	trustScore: 1,
	credit: 1,
	consecutiveLogins: 1,
} as const;

const fullFields = {
	emails: 1,
	phone: 1,
	statusConnection: 1,
	bio: 1,
	createdAt: 1,
	lastLogin: 1,
	services: 1,
	requirePasswordChange: 1,
	requirePasswordChangeReason: 1,
	roles: 1,
	trustScore: 1,
	credit: 1,
	consecutiveLogins: 1,
} as const;

let publicCustomFields: Record<string, 0 | 1> = {};
let customFields: Record<string, 0 | 1> = {};

settings.watch<string>('Accounts_CustomFields', (value) => {
	publicCustomFields = {};
	customFields = {};

	if (!value.trim()) {
		return;
	}

	try {
		const customFieldsOnServer = JSON.parse(value.trim());
		Object.keys(customFieldsOnServer).forEach((key) => {
			const element = customFieldsOnServer[key];
			if (element.public) {
				publicCustomFields[`customFields.${key}`] = 1;
			}
			customFields[`customFields.${key}`] = 1;
		});
	} catch (e) {
		logger.warn(`The JSON specified for "Accounts_CustomFields" is invalid. The following error was thrown: ${e}`);
	}
});

const getCustomFields = (canViewAllInfo: boolean): Record<string, 0 | 1> => (canViewAllInfo ? customFields : publicCustomFields);

const getFields = (canViewAllInfo: boolean): Record<string, 0 | 1> => ({
	...defaultFields,
	...(canViewAllInfo && fullFields),
	...getCustomFields(canViewAllInfo),
});

const removePasswordInfo = (user: IUser): Omit<IUser, 'services'> => {
	const { services, ...result } = user;
	return result;
};

export async function getFullUserDataByIdOrUsername(
	userId: string,
	{ filterId, filterUsername }: { filterId: string; filterUsername?: undefined } | { filterId?: undefined; filterUsername: string },
): Promise<IUser | null> {
	const caller = Users.findOneById(userId, { fields: { username: 1 } });
	const targetUser = filterId || filterUsername;
	const myself = (filterId && targetUser === userId) || (filterUsername && targetUser === caller.username);
	const canViewAllInfo = !!myself || hasPermission(userId, 'view-full-other-user-info');

	const fields = getFields(canViewAllInfo);

	const options = {
		fields,
	};
	const user = Users.findOneByIdOrUsername(targetUser, options);
	if (!user) {
		return null;
	}

	user.canViewAllInfo = canViewAllInfo;

	return myself ? user : removePasswordInfo(user);
}
