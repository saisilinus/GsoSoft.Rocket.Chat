interface IImageData {
	file: string;
	width: number;
	height: number;
	url: string;
}

interface ICover {
	baseName: string;
	dimensions: {
		small: IImageData;
		original: IImageData;
	};
}

export interface IEmployee {
	_id: string;
	name: string;
	charge: {
		type: string;
		data: {
			unit: string;
			amount: number;
		};
	};
	ratingScore: number;
	ratingCount: number;
	ratingAvg: number;
	photoCount: number;
	timestamp: Date;
	viewCount: number;
	address: string;
	lastUpdateStamp: Date;
	covers: ICover[];
}

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		// eslint-disable-next-line prefer-const,eqeqeq
		let r = (Math.random() * 16) | 0;
		// eslint-disable-next-line eqeqeq
		const v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

const generateRandomDate = (): Date => new Date(+new Date() - Math.floor(Math.random() * 10000000000));

export const generateEmployees = (limit = 3): IEmployee[] => {
	const employeeList: IEmployee[] = [];

	for (let i = 0; i < limit; i++) {
		const newEmployee: IEmployee = {
			_id: uuid(),
			name: 'name here',
			charge: {
				type: 'PerTimeReactComponent',
				data: {
					unit: 'hour',
					amount: 3453,
				},
			},
			ratingScore: Math.random() * 10,
			ratingCount: Math.floor(Math.random() * 1000) + 1,
			ratingAvg: Math.random() * 10,
			photoCount: Math.floor(Math.random() * 50) + 1,
			timestamp: generateRandomDate(),
			viewCount: Math.floor(Math.random() * 50),
			address: `Test, Vietnam`,
			lastUpdateStamp: generateRandomDate(),
			covers: [
				{
					baseName: 'avatar1',
					dimensions: {
						small: {
							file: 'avatar1-small.jpeg',
							width: 270,
							height: 270,
							url: 'https://xxxxxxxxxxxx/yyyyyy/avatar1-small.jpeg',
						},
						original: {
							file: 'avatar1-original.jpeg',
							width: 270,
							height: 270,
							url: 'https://xxxxxxxxxxxx/yyyyyy/avatar1-original.jpeg',
						},
					},
				},
				{
					baseName: 'avatar2',
					dimensions: {
						small: {
							file: 'avatar2-small.jpeg',
							width: 270,
							height: 270,
							url: 'https://xxxxxxxxxxxx/yyyyyy/avatar3-small.jpeg',
						},
						original: {
							file: 'avatar2-original.jpeg',
							width: 270,
							height: 270,
							url: 'https://xxxxxxxxxxxx/yyyyyy/avatar3-original.jpeg',
						},
					},
				},
				{
					baseName: 'avatar3',
					dimensions: {
						small: {
							file: 'avatar3-small.jpeg',
							width: 270,
							height: 270,
							url: 'https://xxxxxxxxxxxx/yyyyyy/avatar3-small.jpeg',
						},
						original: {
							file: 'avatar3-original.jpeg',
							width: 270,
							height: 270,
							url: 'https://xxxxxxxxxxxx/yyyyyy/avatar3-original.jpeg',
						},
					},
				},
			],
		};

		employeeList.push(newEmployee);
	}

	return employeeList;
};
