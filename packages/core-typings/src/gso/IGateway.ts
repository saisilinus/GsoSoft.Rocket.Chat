import type { IRocketChatRecord } from '../IRocketChatRecord';

export interface IGateway extends IRocketChatRecord {
	show: boolean;
	active: boolean;
	sortOrder: number;
	icon: string;
	cmpClass?: string;
	cmpConfig?: Record<string, any>;
}
