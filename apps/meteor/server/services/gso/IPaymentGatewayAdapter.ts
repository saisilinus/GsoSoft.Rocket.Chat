import type { IPaymentGateway } from '@rocket.chat/core-typings';


// export type IGatewayCreateParams = PartialBy<Omit<IPaymentGateway, '_updatedAt'>, 'cmpClass' | 'cmpConfig'>;
//
// export type IGatewayUpdateParams = AtLeastOne<IGatewayLean>;
/**
 * Payment gateway is the manager of third party gateway such as paypal, bank transfer, etc..
 */
export interface IPaymentGatewayAdapter {
	getId(): string;

	getGatewayInfo(): IPaymentGateway;

	/**
	 * Initialize payment
	 * @param $input
	 * @return array : Payment object containing : status , amount, currency , tnxId
	 */
	init($input): any;

	process($input);

	/**
	 * A quick validation on user's input
	 *
	 * @param $input
	 * @return boolean
	 */
	validate($input);


}
