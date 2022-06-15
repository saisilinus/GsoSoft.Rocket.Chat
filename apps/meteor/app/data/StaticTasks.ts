import { ITask } from '../../definition/ITask';

const getRandomFutureDate = () => {
	const today = new Date();
	const nonce = Math.floor(Math.random() * 10);
	return new Date(today.setDate(today.getDate() + nonce));
};

const staticFields: Pick<ITask, 'startDate' | 'endDate' | 'assignedBy' | 'assignedTo' | 'sortOrder'> = {
	startDate: new Date(),
	endDate: getRandomFutureDate(),
	assignedBy: '',
	assignedTo: '',
	sortOrder: 0,
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
		description:
			'Install test and QA servers and prerequisite software and verify connectivity from test and QA servers to test LPAR, Tivoli Enterprise Console(R) server, and console machines',
		...staticFields,
		type: 'longterm',
		status: -1,
		reward: 10,
	},
	{
		title: 'Install the product in the test/QA environment',
		description:
			'Configure servers, Source/390 on the test LPAR, event enablement on the Tivoli Enterprise Console server, and verify connectivity',
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
		description:
			'Configure servers, Source/390 on the production LPARs, event enablement on the Tivoli Enterprise Console server, and verify connectivity',
		...staticFields,
		type: 'achievements',
		status: -1,
		reward: 25,
	},
];
