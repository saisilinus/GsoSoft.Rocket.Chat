import React from 'react';

type Props = {
	gateway: string;
	amount: number;
	quantity: number;
	currency: string;
};

const PaymentModule = ({ gateway, amount, quantity, currency }: Props) => {
	return <div>PaymentModule</div>;
};

export default PaymentModule;
