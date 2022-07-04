import { faker } from '@faker-js/faker';
import { ITask } from '@rocket.chat/core-typings/dist/gso';
import { ModelOptionalId } from '@rocket.chat/model-typings';

const typeOptions: ITask['type'][] = ['daily', 'longterm', 'achievements'];
const statusOptions: ITask['status'][] = [-1, 0, 1];
const getRandomNumber = Math.ceil(Math.random() * 10);

const getRandomFutureDate = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + getRandomNumber));
};

const pickRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const staticFields: Pick<ITask, 'startDate' | 'endDate' | 'assignedBy' | 'assignedTo' | 'sortOrder'> = {
    startDate: new Date(),
    endDate: getRandomFutureDate(),
    assignedBy: '',
    assignedTo: '',
    sortOrder: getRandomNumber,
};

export const sampleTasks: Omit<ITask, '_id' | '_updatedAt'>[] = [
    {
        title: 'Design the solution',
        description: 'Identify resources to be monitored and define the server configuration',
        ...staticFields,
        type: 'daily',
        status: -1,
        reward: 10,  
    },
    {
        title: 'Prepare for implementation',
        description: 'Identify the implementation team and order the server hardware for production as well as test/quality assurance (QA).',
        ...staticFields,
        type: 'longterm',
        sortOrder: 1,
        status: -1,
        reward: 20,  
    },
    {
        title: 'Prepare the test/QA environment',
        description: 'Install test and QA servers and prerequisite software and verify connectivity from test and QA servers to test LPAR, Tivoli Enterprise Console(R) server, and console machines',
        ...staticFields,
        type: 'longterm',
        status: -1,
        reward: 10,  
    },
    {
        title: 'Install the product in the test/QA environment',
        description: 'Configure servers, Source/390 on the test LPAR, event enablement on the Tivoli Enterprise Console server, and verify connectivity',
        ...staticFields,
        type: 'achievements',
        status: 0,
        sortOrder: 1,
        reward: 100,  
    },
    {
        title: 'Implement distributed data feeds',
        description: 'For each resource type: extend the data model and configure the instance placement',
        ...staticFields,
        type: 'daily',
        status: 1,
        reward: 10,  
    },
    {
        title: 'Implement Source/390 data feeds on the test LPAR',
        description: 'For each resource type: configure filtering, if appropriate, and perform discovery',
        ...staticFields,
        type: 'daily',
        status: 1,
        reward: 10,  
    },
    {
        title: 'Implement a business system in the test/QA environment',
        description: 'Create the Automated Business Systems configuration file and XML definitions for the business system',
        ...staticFields,
        type: 'longterm',
        status: 0,
        reward: 50,  
    },
    {
        title: 'Schedule jobs',
        description: 'Database backup and maintenance',
        ...staticFields,
        type: 'longterm',
        status: 0,
        reward: 15,  
    },
    {
        title: 'Prepare the production environment',
        description: 'Install production servers and prerequisite software',
        ...staticFields,
        type: 'achievements',
        status: 0,
        reward: 50,  
    },
    {
        title: 'Install the product in the production environment',
        description: 'Configure servers, Source/390 on the production LPARs, event enablement on the Tivoli Enterprise Console server, and verify connectivity',
        ...staticFields,
        type: 'achievements',
        status: -1,
        reward: 25,  
    },
];

/**
 * Generates random tasks
 * @param limit number of tasks to generate (default=100)
 * @returns tasks
 */
export const generateTasks = (limit:number = 100): Pick<ModelOptionalId<ITask>, "_id" | "title" | "description" | "startDate" | "endDate" | "assignedBy" | "assignedTo" | "type" | "sortOrder" | "status" | "reward">[] => {
    let taskList: Omit<ITask, '_id' | '_updatedAt'>[] = [];

    for(let i = 0;i < limit; i++) {
        let newTask: Omit<ITask, '_id' | '_updatedAt'> = {
            ...staticFields,
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            type: pickRandom(typeOptions),
            status: pickRandom(statusOptions),
            reward: Math.ceil(Math.random() * 100),
        };
        taskList.push(newTask);
    }

    return taskList;
};
