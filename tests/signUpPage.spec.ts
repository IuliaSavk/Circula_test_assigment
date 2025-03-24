import { test } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { COUNTRIES } from '../data/testData';

const { SWEDEN, AUSTRIA } = COUNTRIES;

test.describe('Signup page tests', () => {
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await page.goto('/');
    await signupPage.fillSignInForm()
    await signupPage.fillEmailAndPasswordForm();
    await signupPage.fillYourContactDetailsForm();
    await signupPage.fillCompanyName();
  });

  test('Sweden is available in the drop-down and user can successfully sign up', async () => {
    await test.step('Select and verify Sweden is available in the dropdown', async () => {
      await signupPage.selectCountryFromDropdown(SWEDEN);
      await signupPage.verifySelectedCountryIsVisibleInInput(SWEDEN);
    });

    await test.step('Complete signup process with Sweden selected', async () => {
      await signupPage.pickValueFromHowDidYouHearAboutUsDropDown();
      await signupPage.clickCreateAccount();
      await signupPage.verifyEmailConfirmation();
    });
  });

  test('Sweden persists in the drop-down after navigating back and forward', async () => {
    await test.step('Select Sweden from the dropdown and verify it is visible', async () => {
      await signupPage.selectCountryFromDropdown(SWEDEN);
      await signupPage.verifySelectedCountryIsVisibleInInput(SWEDEN);
    });

    await test.step('Navigate back and then forward', async () => {
      await signupPage.clickBackButton();
      await signupPage.clickNextStepButton();
    });

    await test.step('Verify Sweden is still selected after navigation', async () => {
      await signupPage.verifySelectedCountryIsVisibleInInput(SWEDEN);
    });
  });

  test('Verify that only "Sweden" appears as a suggestion after typing "Sweden"', async () => {
    await test.step('Type "Sweden" in the country input and verify it appears in suggestions', async () => {
      await signupPage.openCountryDropdown();
      await signupPage.typeCountry(SWEDEN);
      await signupPage.verifyTypedCountryIsAmongVisibleOptions(SWEDEN);
    });

    await test.step('Verify that only one suggestion appears', async () => {
      await signupPage.verifyOnlyOneCountryIsAmongVisibleOptions();
    });

    await test.step('Select Sweden and verify it is selected', async () => {
      await signupPage.selectOption(SWEDEN);
      await signupPage.verifySelectedCountryIsVisibleInInput(SWEDEN);
    });
  });

  test('User can successfully sign up after selecting another country', async () => {
    await test.step('Select Austria in the dropdown and verify it is selected', async () => {
      await signupPage.selectCountryFromDropdown(AUSTRIA);
      await signupPage.verifySelectedCountryIsVisibleInInput(AUSTRIA);
    });

    await test.step('Complete the signup form', async () => {
      await signupPage.pickValueFromHowDidYouHearAboutUsDropDown();
    });

    await test.step('Submit the form and verify successful signup', async () => {
      await signupPage.clickCreateAccount();
      await signupPage.verifyEmailConfirmation();
    });
  });
});