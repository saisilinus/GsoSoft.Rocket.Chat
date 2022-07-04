import { faker } from '@faker-js/faker';

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
    }
}

export interface IEmployee {
    _id: string;
    name: string;
    charge: {
        type: string;
        data: {
            unit: string;
            amount: string;
        }
    },
    ratingScore: number;
    ratingCount: number;
    ratingAvg: number;
    photoCount: number;
    timestamp: number;
    viewCount: number;
    address: string;
    lastUpdateStamp: number;
    covers: ICover[];
}

export const generateEmployees = (limit:number = 3) => {
    let employeeList: IEmployee[] = [];

    for(let i = 0;i < limit; i++) {
        let newEmployee: IEmployee = {
            _id: faker.datatype.uuid(),
            name: faker.name.findName(),
            charge: {
                type: 'PerTimeReactComponent',
                data: {
                    unit: 'hour',
                    amount: faker.finance.amount(),
                }
            },
            ratingScore: Math.random() * 10,
            ratingCount: faker.datatype.number({ min: 1, max: 1000 }),
            ratingAvg: Math.random() * 10,
            photoCount: faker.datatype.number({ min: 1, max: 50 }),
            timestamp: faker.date.past(5).getTime(),
            viewCount: faker.datatype.number({ min: 0, max: 50 }),
            address: `${faker.address.city()}, Vietnam`,
            lastUpdateStamp: faker.date.past(1).getTime(),
            covers: [
                {
                    baseName: 'avatar1',
                    dimensions: {
                        small: {
                            file: 'avatar1-small.jpeg',
                            width: 270,
                            height: 270,
                            url: 'https:\/\/xxxxxxxxxxxx\/yyyyyy\/avatar1-small.jpeg'
                        },
                        original: {
                            file: 'avatar1-original.jpeg',
                            width: 270,
                            height: 270,
                            url: 'https:\/\/xxxxxxxxxxxx\/yyyyyy\/avatar1-original.jpeg'
                        }
                    }
                },
                {
                    baseName: 'avatar2',
                    dimensions: {
                        small: {
                            file: 'avatar2-small.jpeg',
                            width: 270,
                            height: 270,
                            url: 'https:\/\/xxxxxxxxxxxx\/yyyyyy\/avatar3-small.jpeg'
                        },
                        original: {
                            file: 'avatar2-original.jpeg',
                            width: 270,
                            height: 270,
                            url: 'https:\/\/xxxxxxxxxxxx\/yyyyyy\/avatar3-original.jpeg'
                        }
                    }
                },
                {
                    baseName: 'avatar3',
                    dimensions: {
                        small: {
                            file: 'avatar3-small.jpeg',
                            width: 270,
                            height: 270,
                            url: 'https:\/\/xxxxxxxxxxxx\/yyyyyy\/avatar3-small.jpeg'
                        },
                        original: {
                            file: 'avatar3-original.jpeg',
                            width: 270,
                            height: 270,
                            url: 'https:\/\/xxxxxxxxxxxx\/yyyyyy\/avatar3-original.jpeg'
                        }
                    }
                }
            ],
        };

        employeeList.push(newEmployee);
    }

    return employeeList;
};
