import { Locator, Page } from '@playwright/test';

import { ADMIN_CREDENTIALS } from '../utils/constants';

export class Auth {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	get toastSuccess(): Locator {
		return this.page.locator('.rcx-toastbar.rcx-toastbar--success');
	}

	get toastError(): Locator {
		return this.page.locator('.rcx-toastbar.rcx-toastbar--error');
	}

	get btnSubmit(): Locator {
		return this.page.locator('.login');
	}

	get btnRegister(): Locator {
		return this.page.locator('button.register');
	}

	get btnRegisterConfirmUsername(): Locator {
		return this.page.locator('button[data-loading-text=" Please_wait ..."]');
	}

	get btnForgotPassword(): Locator {
		return this.page.locator('.forgot-password');
	}

	get inputEmailOrUsername(): Locator {
		return this.page.locator('[name=emailOrUsername]');
	}

	get inputName(): Locator {
		return this.page.locator('[name=name]');
	}

	get textErrorName(): Locator {
		return this.page.locator('[name=name]~.input-error');
	}

	get inputEmail(): Locator {
		return this.page.locator('[name=email]');
	}

	get textErrorEmail(): Locator {
		return this.page.locator('[name=email]~.input-error');
	}

	get inputPassword(): Locator {
		return this.page.locator('[name=pass]');
	}

	get textErrorPassword(): Locator {
		return this.page.locator('[name=pass]~.input-error');
	}

	get inputPasswordConfirm(): Locator {
		return this.page.locator('[name=confirm-pass]');
	}

	get textErrorPasswordConfirm(): Locator {
		return this.page.locator('[name=confirm-pass]~.input-error');
	}

	async doLogin(input = ADMIN_CREDENTIALS, shouldWaitForHome = true): Promise<void> {
		await this.page.goto('/');
		await this.page.locator('[name=emailOrUsername]').type(input.email);
		await this.page.locator('[name=pass]').type(input.password);
		await this.page.locator('.login').click();

		if (shouldWaitForHome) {
			await this.page.waitForSelector('text="Welcome to Rocket.Chat!"');
		}
	}
}
