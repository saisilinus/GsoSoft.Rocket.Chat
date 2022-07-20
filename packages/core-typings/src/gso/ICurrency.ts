export interface ICurrency {
	/**
	 * this code will be used by client side for description multi-language.
	 * For ex : USD, JPY, VND, etc...
	 * correspondingly : english lang data can be:
	 *   "gso_currency_USD_desc": "This is United State Dollar, bla bla...",
	 *
	 */
	code: string;
	/**
	 * Like $ for USD, € for EURO, ₫ for VND , ₭ for Laos kip
	 */
	symbol: string;
	/**
	 * whether is a main currency of the system.
	 */
	isMain: boolean;
	/**
	 * Exchange rate of 1 unit of this currency to another one. Example Format for code = USD:
	 * exchangeRate: {
	 *   "THB": 37.2,
	 *   "JPY": 226.55
	 * }
	 * if empty = this coin can not be exchange to other coin.
	 */
	exchangeRate: any;

	isDepositable: boolean;
	isWithdrawable: boolean;
}
