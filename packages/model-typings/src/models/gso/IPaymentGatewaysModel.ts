import type { IPaymentGateway } from '@rocket.chat/core-typings';

import type { IBaseModel } from './IBaseModel';

// export type IGatewayCreateParams = PartialBy<Omit<IPaymentGateway, '_updatedAt'>, 'cmpClass' | 'cmpConfig'>;
//
// export type IGatewayUpdateParams = AtLeastOne<IGatewayLean>;

export interface IPaymentGatewaysModel extends IBaseModel<IPaymentGateway> {
	create(params: any): Promise<IPaymentGateway>;

	delete(gatewayId: IPaymentGateway['_id']): Promise<void>;

	getGateway(gatewayId: IPaymentGateway['_id']): Promise<IPaymentGateway>;
}
