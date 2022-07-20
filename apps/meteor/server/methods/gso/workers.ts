import { Meteor } from 'meteor/meteor';

Meteor.methods({
	getWorkers() {
		return [
			{
				id: '42826',
				name: 'Mr John',
				charge: {
					type: 'PerTimeReactComponent',
					data: {
						unit: 'hour',
						amount: 500,
					},
				},
				ratingScore: '9.826557',
				ratingCount: '2',
				ratingAvg: '10.000000',
				photoCount: '20',
				timestamp: '1655152738',
				viewCount: '0',
				address: 'Ho\u00e0ng Di\u1ec7u, Qu\u1eadn 4,H\u1ed3 Ch\u00ed Minh, Vietnam',
				lastUpdateStamp: '1623407041',
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
								url: 'https://xxxxxxxxxxxx/yyyyyy/avatar2-small.jpeg',
							},
							original: {
								file: 'avatar2-original.jpeg',
								width: 270,
								height: 270,
								url: 'https://xxxxxxxxxxxx/yyyyyy/avatar2-original.jpeg',
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
			},
			{
				id: '689253245',
				name: 'Ms Clara',
				charge: {
					type: 'SomeCustomChargeLogicReactComponent',
					data: {
						data1: 'aaaa',
						data2: 2222,
					},
				},
				ratingScore: '9.826557',
				ratingCount: '2',
				ratingAvg: '10.000000',
				photoCount: '20',
				timestamp: '1655152738',
				viewCount: '0',
				address: 'Ho\u00e0ng Di\u1ec7u, Qu\u1eadn 4,H\u1ed3 Ch\u00ed Minh, Vietnam',
				lastUpdateStamp: '1623407041',
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
								url: 'https://xxxxxxxxxxxx/yyyyyy/avatar2-small.jpeg',
							},
							original: {
								file: 'avatar2-original.jpeg',
								width: 270,
								height: 270,
								url: 'https://xxxxxxxxxxxx/yyyyyy/avatar2-original.jpeg',
							},
						},
					},
				],
			},
			{
				id: '52345234',
				name: 'Mrs Mary',
				charge: {
					type: 'PerTimeReactComponent',
					data: {
						unit: 'day',
						amount: 500,
					},
				},
				ratingScore: '9.826557',
				ratingCount: '2',
				ratingAvg: '10.000000',
				photoCount: '20',
				timestamp: '1655152738',
				viewCount: '0',
				address: 'Ho\u00e0ng Di\u1ec7u, Qu\u1eadn 4,H\u1ed3 Ch\u00ed Minh, Vietnam',
				lastUpdateStamp: '1623407041',
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
								url: 'https://xxxxxxxxxxxx/yyyyyy/avatar2-small.jpeg',
							},
							original: {
								file: 'avatar2-original.jpeg',
								width: 270,
								height: 270,
								url: 'https://xxxxxxxxxxxx/yyyyyy/avatar2-original.jpeg',
							},
						},
					},
				],
			},
			{
				id: '424546',
				name: 'Mr Rengoku',
				charge: {
					type: 'PerTimeReactComponent',
					data: {
						unit: 'hour',
						amount: 500,
					},
				},
				ratingScore: '9.826557',
				ratingCount: '2',
				ratingAvg: '10.000000',
				photoCount: '20',
				timestamp: '1655152738',
				viewCount: '0',
				address: 'Ho\u00e0ng Di\u1ec7u, Qu\u1eadn 4,H\u1ed3 Ch\u00ed Minh, Vietnam',
				lastUpdateStamp: '1623407041',
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
								url: 'https://xxxxxxxxxxxx/yyyyyy/avatar2-small.jpeg',
							},
							original: {
								file: 'avatar2-original.jpeg',
								width: 270,
								height: 270,
								url: 'https://xxxxxxxxxxxx/yyyyyy/avatar2-original.jpeg',
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
			},
			{
				id: '50084834',
				name: 'Ms Nami',
				charge: {
					type: 'PerTimeReactComponent',
					data: {
						unit: 'day',
						amount: 500,
					},
				},
				ratingScore: '9.826557',
				ratingCount: '2',
				ratingAvg: '10.000000',
				photoCount: '20',
				timestamp: '1655152738',
				viewCount: '0',
				address: 'Ho\u00e0ng Di\u1ec7u, Qu\u1eadn 4,H\u1ed3 Ch\u00ed Minh, Vietnam',
				lastUpdateStamp: '1623407041',
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
								url: 'https://xxxxxxxxxxxx/yyyyyy/avatar2-small.jpeg',
							},
							original: {
								file: 'avatar2-original.jpeg',
								width: 270,
								height: 270,
								url: 'https://xxxxxxxxxxxx/yyyyyy/avatar2-original.jpeg',
							},
						},
					},
				],
			},
		];
	},
});
