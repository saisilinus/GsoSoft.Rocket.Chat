import type {
	IAnalyticsModel,
	IAvatarsModel,
	IBannersDismissModel,
	IBannersModel,
	ICannedResponseModel,
	ICredentialTokensModel,
	ICustomSoundsModel,
	ICustomUserStatusModel,
	IEmailInboxModel,
	IEmailMessageHistoryModel,
	IEmojiCustomModel,
	IExportOperationsModel,
	IFederationKeysModel,
	IFederationServersModel,
	IInstanceStatusModel,
	IIntegrationHistoryModel,
	IIntegrationsModel,
	IInvitesModel,
	IImportDataModel,
	ILivechatAgentActivityModel,
	ILivechatBusinessHoursModel,
	ILivechatCustomFieldModel,
	ILivechatDepartmentAgentsModel,
	ILivechatDepartmentModel,
	ILivechatInquiryModel,
	ILivechatPriorityModel,
	ILivechatRoomsModel,
	ILivechatTagModel,
	ILivechatTriggerModel,
	ILivechatUnitModel,
	ILivechatUnitMonitorsModel,
	ILivechatVisitorsModel,
	ILoginServiceConfigurationModel,
	IMessagesModel,
	INotificationQueueModel,
	INpsModel,
	INpsVoteModel,
	IOAuthAppsModel,
	IOEmbedCacheModel,
	IOmnichannelQueueModel,
	IPbxEventsModel,
	IPushTokenModel,
	IPermissionsModel,
	IReadReceiptsModel,
	IReportsModel,
	IRolesModel,
	IRoomsModel,
	IServerEventsModel,
	ISessionsModel,
	ISettingsModel,
	ISmarshHistoryModel,
	IStatisticsModel,
	ISubscriptionsModel,
	ITeamMemberModel,
	ITeamModel,
	IUploadsModel,
	IUserDataFilesModel,
	IUsersSessionsModel,
	IUsersModel,
	IVoipRoomModel,
	IWebdavAccountsModel,
	IEscrowsModel,
	IFundTransactionsModel,
	IBlogsModel,
	ICommentsModel,
	IGamesModel,
	IGatewaysModel,
	IProductsModel,
	ITagGroupsModel,
	ITagsModel,
	ITasksModel,
	ITransactionsModel,
	IPaymentGatewaysModel,
} from '@rocket.chat/model-typings';

import { proxify } from './proxify';

const prefix = 'rocketchat_';

/**
 * Help getting mongo db collection name more accurately
 * @param name
 * @param isGso : part of GSO system
 */
export function getCollectionName(name: string, isGso = false): string {
	return isGso ? `gso${name}` : `${prefix}${name}`;
}

export { registerModel } from './proxify';

export const Analytics = proxify<IAnalyticsModel>('IAnalyticsModel');
export const Avatars = proxify<IAvatarsModel>('IAvatarsModel');
export const BannersDismiss = proxify<IBannersDismissModel>('IBannersDismissModel');
export const Banners = proxify<IBannersModel>('IBannersModel');
export const CannedResponse = proxify<ICannedResponseModel>('ICannedResponseModel');
export const CredentialTokens = proxify<ICredentialTokensModel>('ICredentialTokensModel');
export const CustomSounds = proxify<ICustomSoundsModel>('ICustomSoundsModel');
export const CustomUserStatus = proxify<ICustomUserStatusModel>('ICustomUserStatusModel');
export const EmailInbox = proxify<IEmailInboxModel>('IEmailInboxModel');
export const EmailMessageHistory = proxify<IEmailMessageHistoryModel>('IEmailMessageHistoryModel');
export const EmojiCustom = proxify<IEmojiCustomModel>('IEmojiCustomModel');
export const ExportOperations = proxify<IExportOperationsModel>('IExportOperationsModel');
export const FederationServers = proxify<IFederationServersModel>('IFederationServersModel');
export const FederationKeys = proxify<IFederationKeysModel>('IFederationKeysModel');
export const ImportData = proxify<IImportDataModel>('IImportDataModel');
export const InstanceStatus = proxify<IInstanceStatusModel>('IInstanceStatusModel');
export const IntegrationHistory = proxify<IIntegrationHistoryModel>('IIntegrationHistoryModel');
export const Integrations = proxify<IIntegrationsModel>('IIntegrationsModel');
export const Invites = proxify<IInvitesModel>('IInvitesModel');
export const LivechatAgentActivity = proxify<ILivechatAgentActivityModel>('ILivechatAgentActivityModel');
export const LivechatBusinessHours = proxify<ILivechatBusinessHoursModel>('ILivechatBusinessHoursModel');
export const LivechatCustomField = proxify<ILivechatCustomFieldModel>('ILivechatCustomFieldModel');
export const LivechatDepartmentAgents = proxify<ILivechatDepartmentAgentsModel>('ILivechatDepartmentAgentsModel');
export const LivechatDepartment = proxify<ILivechatDepartmentModel>('ILivechatDepartmentModel');
export const LivechatInquiry = proxify<ILivechatInquiryModel>('ILivechatInquiryModel');
export const LivechatPriority = proxify<ILivechatPriorityModel>('ILivechatPriorityModel');
export const LivechatRooms = proxify<ILivechatRoomsModel>('ILivechatRoomsModel');
export const LivechatTag = proxify<ILivechatTagModel>('ILivechatTagModel');
export const LivechatTrigger = proxify<ILivechatTriggerModel>('ILivechatTriggerModel');
export const LivechatVisitors = proxify<ILivechatVisitorsModel>('ILivechatVisitorsModel');
export const LivechatUnit = proxify<ILivechatUnitModel>('ILivechatUnitModel');
export const LivechatUnitMonitors = proxify<ILivechatUnitMonitorsModel>('ILivechatUnitMonitorsModel');
export const LoginServiceConfiguration = proxify<ILoginServiceConfigurationModel>('ILoginServiceConfigurationModel');
export const Messages = proxify<IMessagesModel>('IMessagesModel');
export const NotificationQueue = proxify<INotificationQueueModel>('INotificationQueueModel');
export const Nps = proxify<INpsModel>('INpsModel');
export const NpsVote = proxify<INpsVoteModel>('INpsVoteModel');
export const OAuthApps = proxify<IOAuthAppsModel>('IOAuthAppsModel');
export const OEmbedCache = proxify<IOEmbedCacheModel>('IOEmbedCacheModel');
export const OmnichannelQueue = proxify<IOmnichannelQueueModel>('IOmnichannelQueueModel');
export const PbxEvents = proxify<IPbxEventsModel>('IPbxEventsModel');
export const PushToken = proxify<IPushTokenModel>('IPushTokenModel');
export const Permissions = proxify<IPermissionsModel>('IPermissionsModel');
export const ReadReceipts = proxify<IReadReceiptsModel>('IReadReceiptsModel');
export const Reports = proxify<IReportsModel>('IReportsModel');
export const Roles = proxify<IRolesModel>('IRolesModel');
export const Rooms = proxify<IRoomsModel>('IRoomsModel');
export const ServerEvents = proxify<IServerEventsModel>('IServerEventsModel');
export const Sessions = proxify<ISessionsModel>('ISessionsModel');
export const Settings = proxify<ISettingsModel>('ISettingsModel');
export const SmarshHistory = proxify<ISmarshHistoryModel>('ISmarshHistoryModel');
export const Statistics = proxify<IStatisticsModel>('IStatisticsModel');
export const Subscriptions = proxify<ISubscriptionsModel>('ISubscriptionsModel');
export const TeamMember = proxify<ITeamMemberModel>('ITeamMemberModel');
export const Team = proxify<ITeamModel>('ITeamModel');
export const Users = proxify<IUsersModel>('IUsersModel');
export const Uploads = proxify<IUploadsModel>('IUploadsModel');
export const UserDataFiles = proxify<IUserDataFilesModel>('IUserDataFilesModel');
export const UsersSessions = proxify<IUsersSessionsModel>('IUsersSessionsModel');
export const VoipRoom = proxify<IVoipRoomModel>('IVoipRoomModel');
export const WebdavAccounts = proxify<IWebdavAccountsModel>('IWebdavAccountsModel');

// gso expansion , each model here is like a mongodb Collection
export const Escrows = proxify<IEscrowsModel>('IEscrowsModel');
export const FundTransactions = proxify<IFundTransactionsModel>('IFundTransactionsModel');
export const Blogs = proxify<IBlogsModel>('IBlogsModel');
export const Comments = proxify<ICommentsModel>('ICommentsModel');
export const Games = proxify<IGamesModel>('IGamesModel');
export const Gateways = proxify<IGatewaysModel>('IGatewaysModel');
export const Products = proxify<IProductsModel>('IProductsModel');
export const TagGroups = proxify<ITagGroupsModel>('ITagGroupsModel');
export const Tags = proxify<ITagsModel>('ITagsModel');
export const Tasks = proxify<ITasksModel>('ITasksModel');
export const Transactions = proxify<ITransactionsModel>('ITransactionsModel');
export const PaymentGateways = proxify<IPaymentGatewaysModel>('IPaymentGatewaysModel');
