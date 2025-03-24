import { Page, expect, Locator } from '@playwright/test';
import { generateRandomEmail, generateRandomPassword, generateRandomCompanyName, generateRandomName, checkOnlyOneVisible } from '../utils';

export class SignupPage {
  private denyCookiesButton: Locator;
  private startFreeTrialButton: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private tryForFreeButton: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private nextStepButton: Locator;
  private backButton: Locator;
  private companyNameInput: Locator;
  private countryInput: Locator;
  private chooseChannel: Locator;
  private datevChannel: Locator;
  private createAccount: Locator;
  private emailConfirmationMessage: Locator;

  constructor(private page: Page) {
    this.denyCookiesButton = page.getByTestId('uc-deny-all-button');
    this.startFreeTrialButton = page.getByText('Start a free trial');
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.tryForFreeButton = page.getByRole('button', { name: 'Try for free' });
    this.firstNameInput = page.locator('[name="firstname"]');
    this.lastNameInput = page.locator('[name="lastname"]');
    this.nextStepButton = page.getByRole('button', { name: 'Next step' });
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.companyNameInput = page.locator('[name="organizationName"]');
    this.countryInput = page.locator('[name="country"]');
    this.chooseChannel = page.getByRole('button', { name: 'Choose channel' });
    this.datevChannel = page.getByRole('menuitemradio', { name: 'DATEV' });
    this.createAccount = page.getByRole('button', { name: 'Create an account' });
    this.emailConfirmationMessage = page.getByText('Great! Now please verify your email');
  }

  // Sign-In form methods

  async denyCookies(): Promise<void> {
    await this.denyCookiesButton.click();
  }

  async fillSignInForm(): Promise<void> {
    await this.denyCookies();
    await this.startFreeTrialButton.click();
  }

  // Sign up form methods

  async clickOnAcceptTermsAndConditionsCheckbox(): Promise<void> {
    // Unfortunately simple click on page.locator('input[name="acceptTos"]').click({ force: true }); is not working in all browsers.
    // That's why we are forced here to use DOM directly with page.evaluate()
    await this.page.evaluate(() => {
      const acceptTosCheckbox = document.querySelector('input[name="acceptTos"]') as HTMLInputElement;
      acceptTosCheckbox.click();
    });
  }


  // Forms Filling

  async fillEmailAndPasswordForm(): Promise<void> {
    await this.denyCookies();

    const email: string = generateRandomEmail();
    const password: string = generateRandomPassword();

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.clickOnAcceptTermsAndConditionsCheckbox();
    await this.tryForFreeButton.click();
  }

  async fillYourContactDetailsForm(): Promise<void> {
    await this.firstNameInput.fill(generateRandomName());
    await this.lastNameInput.fill(generateRandomName());
    await this.clickNextStepButton();
  }

  async fillCompanyName(): Promise<void> {
    const companyName: string = generateRandomCompanyName();
    await this.companyNameInput.fill(companyName);
  }

  // Button clicks

  async clickCreateAccount(): Promise<void> {
    await this.createAccount.click();
  }

  async clickBackButton(): Promise<void> {
    await this.backButton.click();
  }

  async clickNextStepButton(): Promise<void> {
    await this.nextStepButton.click();
  }

  // "Where’s your company registered?" dropdown handling

  async openCountryDropdown(): Promise<void> {
    await this.countryInput.click();
  }

  async selectOption(optionName: string): Promise<void> {
    const option: Locator = this.page.getByRole('option', { name: optionName });
    // Scroll into view to avoid hidden element errors
    await option.scrollIntoViewIfNeeded();
    await option.hover();
    await option.click();
  }

  async selectCountryFromDropdown(countryName: string): Promise<void> {
    await this.openCountryDropdown();
    await this.selectOption(countryName);
  }

  async typeCountry(country: string): Promise<void> {
    await this.countryInput.click();
    await this.countryInput.fill('');
    await this.countryInput.fill(country);
  }

  // "How did you hear about us?" dropdown handling

  async pickValueFromHowDidYouHearAboutUsDropDown(): Promise<void> {
    await this.chooseChannel.click();
    // Scroll into view to avoid hidden element errors
    await this.datevChannel.scrollIntoViewIfNeeded();
    await this.datevChannel.hover();
    await this.datevChannel.click();
  }

  // Verifications

  async verifySelectedCountryIsVisibleInInput(country: string): Promise<void> {
    await expect(this.countryInput).toHaveValue(country);
  }

  async verifyTypedCountryIsAmongVisibleOptions(country: string): Promise<void> {
    await expect(this.page.getByRole('option', { name: country })).toBeVisible();
  }

  async verifyOnlyOneCountryIsAmongVisibleOptions(): Promise<void> {
    const options: Locator = this.page.getByRole('option');
    await checkOnlyOneVisible(options);
  }

  async verifyEmailConfirmation(): Promise<void> {
    await expect(this.emailConfirmationMessage).toBeVisible();
  }
}
