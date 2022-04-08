import { test } from '@playwright/test';
import { v4 } from 'uuid';

import ChannelCreation from './utils/pageobjects/ChannelCreation';
import LoginPage from './utils/pageobjects/LoginPage';
import { validUser, ROCKET_CAT } from './utils/mocks/userAndPasswordMock';
import { LOCALHOST } from './utils/mocks/urlMock';

test.describe('[Channel]', async () => {
	let channelCreation: ChannelCreation;
	let loginPage: LoginPage;

	const HELLO = 'Hello';

	test.beforeEach(async ({ page, baseURL }) => {
		const baseUrl = baseURL || LOCALHOST;
		loginPage = new LoginPage(page);
		await loginPage.goto(baseUrl);
		await loginPage.login(validUser);

		channelCreation = new ChannelCreation(page);
	});

	test.describe('[Public and private channel creation]', () => {
		let channelName: string;
		test.beforeEach(async () => {
			channelName = v4();
		});

		test('expect create privateChannel channel', async () => {
			await channelCreation.createChannel(channelName, true);
		});

		test('expect create public channel', async () => {
			await channelCreation.createChannel(channelName, false);
		});
	});
	//TODO: Verify why is intermitent
	test.skip('expect send message to channel created', async () => {
		await channelCreation.sendMessage(ROCKET_CAT, HELLO);
	});
});
