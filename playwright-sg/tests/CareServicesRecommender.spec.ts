import { test, expect, Page } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GoWhere/);
});

/*
Given user lands on homepage
When he clicks on SupportGoWhere link in dropdown 
Then a new page should open in new tab
Then page header text should be `Get the help you need`
*/
test('Verify SupportGoWhere campaigns link in dropdown', async ({ page }) => {

  await page.locator(`#nav-dropdown1 span`).click()

  await page.getByRole('link', { name: 'SupportGoWhere SupportGoWhere' }).first().click()

  await expect(page.getByText('Get the help you need')).toBeVisible()
});

/*
Given user lands on homepage
When he clicks on SupportGoWhere campaign tile 
Then a new page should open in new tab
Then page header text should be `Get the help you need`
*/
test('Verify SupportGoWhere campaigns tile in homePage', async ({ page }) => {
  const page1Promise = page.waitForEvent('popup');

  await page.getByRole('link', { name: 'SupportGoWhere SupportGoWhere' }).first().click()

  const page1 = await page1Promise;

  await expect(page1.getByText('Get the help you need')).toBeVisible()
});

test.describe('Care Services Recommender form suite', () => {
  var page1: Page;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/GoWhere/);

    const page1Promise = page.waitForEvent('popup');

    await page.getByRole('link', { name: 'SupportGoWhere SupportGoWhere' }).first().click()

    page1 = await page1Promise;

    await expect(page1.getByText('Get the help you need')).toBeVisible()

    await page1.locator('div').filter({ hasText: /^Find the support you need as a caregiver to your loved ones\.Use Recommender$/ }).getByLabel('Use Recommender').click();

    await expect(page1.getByRole('main')).toContainText('Care Services Recommender');

    await page1.getByText('Answer a few questions and').click();

    await expect(page1.getByTestId('mastheadSubtitle')).toContainText('Answer a few questions and get recommendations based on your caregiving needs.');

    let notePoints: string[] = ['Important to note:', 'Recommender will take up to 5 minutes to complete.', 'Recommendations shown are based on your selection.', 'Results shown do not guarantee your eligibility or qualification for the schemes and services, which are subject to meeting providers\' service boundaries and the availability of vacancies.']

    for (let i = 0; i < notePoints.length; i++)
      await expect(page1.getByRole('main')).toContainText(notePoints[i]);

    await page1.getByRole('button', { name: 'Start' }).click();
  })

  /*
    Given user navigates to campaign page
    When user clicks next btn without selecting any option for question-1
    Then a error msg should display saying i.e this field is required
    */
  test('Verify field is required error message when user clicks next btn without selecting option', async ({ page }) => {
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(await page1.getByText('This is a required field.')).toBeVisible()
  });

  /*
  Given user navigates to campaign page
  When user clicks all the options for question-1
  When user clicks back btn 
  Then a dialog should show and user can dismiss dialog
  Then he should be taken to previous page 
  */
  test('Verify Dialog should display when user clicks back buttons on question-1', async ({ page }) => {

    await expect(page1.getByRole('main')).toContainText('Current situation');

    await expect(page1.getByRole('main')).toContainText('What is your loved one’s current situation?');
    //verifying question 1 options,all options should be clickable
    let q1Options = ['Soon to be discharged from', 'Recently discharged from', 'Living at home', 'In nursing home']

    for (let i = 0; i < q1Options.length; i++)
      await page1.getByText(q1Options[i]).click();
    //handling popup on clicking back button in below code
    page1.on('dialog', dialog => dialog.accept());

    await page1.getByRole('button', { name: 'Back' }).click();

    await expect(page1.getByRole('main')).toContainText(`Important to note:`);

  });

  /*
    Given user answers first question
    Then he should be moved to second question
  */
  test('Verify user should be moved to second question on answering first question', async ({ page }) => {

    await page1.getByText(`Soon to be discharged from`).click();

    await page1.getByRole('button', { name: 'Next' }).click();

    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()

    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');

    await page1.getByText('How do I determine my loved').click();

    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');

    await page1.getByRole('button', { name: 'Close' }).click();

    await page1.getByText('May or may not require help').click();
  });

  /*
    Given user answers both first and second questions
    Then user should be moved to third question
  */
  test('Verify user should be moved to third question on answering first & second questions', async ({ page }) => {

    await page1.getByText(`Soon to be discharged from`).click();

    await page1.getByRole('button', { name: 'Next' }).click();

    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()

    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');

    await page1.getByText('How do I determine my loved').click();

    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');

    await page1.getByRole('button', { name: 'Close' }).click();

    await page1.getByText('May or may not require help').click();

    await page1.getByRole('button', { name: 'Next' }).click();

    await expect(page1.getByText('Indicate the level of')).toBeVisible()
  });

  /*
  Given user lands on third question
  And answers all the sub questions inside third question
  And moves to next question
  */
  test('Verify user moves to fourth question post answering all third question sub questions', async ({ page }) => {
    await page1.getByText(`Soon to be discharged from`).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()
    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');
    await page1.getByText('How do I determine my loved').click();
    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByText('May or may not require help').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Indicate the level of')).toBeVisible()
    await page1.locator('fieldset').filter({ hasText: 'FeedingDoes not require any' }).locator('span').first().click();
    await page1.locator('fieldset').filter({ hasText: 'BathingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'ToiletingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'DressingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'MovingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'TransferringDoes not require' }).locator('span').first().click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Medical condition');
  });
  /*
  Given user lands on fourth question
  And for the first sub question user should be able to check multiple options
  And post answering next sub question & on clicking next button
  Then user moves to fifth question
  */
  test('Verify user moves to fifth question post answering all fourth question sub questions', async ({ page }) => {
    await page1.getByText(`Soon to be discharged from`).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()
    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');
    await page1.getByText('How do I determine my loved').click();
    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByText('May or may not require help').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Indicate the level of')).toBeVisible()
    await page1.locator('fieldset').filter({ hasText: 'FeedingDoes not require any' }).locator('span').first().click();
    await page1.locator('fieldset').filter({ hasText: 'BathingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'ToiletingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'DressingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'MovingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'TransferringDoes not require' }).locator('span').first().click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Medical condition');
    await page1.getByText('Physically weaker in the past').click();
    await page1.locator('label').filter({ hasText: 'Recent stroke' }).click();
    await page1.locator('label').filter({ hasText: 'Recent hip fracture' }).click();
    await page1.getByText('Dementia (diagnosed by a').click();
    await page1.getByText('Mental health symptoms or').click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following caregiving support will help you in caring for your loved one?');
  });

  /*
  Given user lands on fifth question
  And user selects none of the above option 
  Or user selects "I’m not sure and would like to speak to someone"
  Then user should see rest of options disabled
  */
  test('Verify in fifth question rest of options should get disabled on clicking "none of the above" or "I’m not sure and would like to speak to someone" options', async ({ page }) => {
    await page1.getByText(`Soon to be discharged from`).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()
    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');
    await page1.getByText('How do I determine my loved').click();
    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByText('May or may not require help').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Indicate the level of')).toBeVisible()
    await page1.locator('fieldset').filter({ hasText: 'FeedingDoes not require any' }).locator('span').first().click();
    await page1.locator('fieldset').filter({ hasText: 'BathingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'ToiletingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'DressingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'MovingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'TransferringDoes not require' }).locator('span').first().click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Medical condition');
    await page1.getByText('Physically weaker in the past').click();
    await page1.locator('label').filter({ hasText: 'Recent stroke' }).click();
    await page1.locator('label').filter({ hasText: 'Recent hip fracture' }).click();
    await page1.getByText('Dementia (diagnosed by a').click();
    await page1.getByText('Mental health symptoms or').click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following caregiving support will help you in caring for your loved one?');
    await page1.getByText('None of the above').click();
    const options = await page1.locator("input[name='cgn.cgas']").all()
    for (let i = 0; i < options.length; i++) {
      if (i == 4)
        break;
      expect(await options.at(i)?.isEditable()).toBeFalsy()
    }
    await page1.getByText('None of the above').click();
    await page1.getByText('I’m not sure and would like').click()
    for (let i = 0; i < options.length; i++) {
      if (i == 3)
        break;
      expect(await options.at(i)?.isEditable()).toBeFalsy()
    }
  });

  /*
    Given user lands on fifth question
    And answers any option other than none of the above or "I’m not sure and would like to speak to someone"
    Then new option should be displayed
    On selecting new option 
    And on clicking next button
    Then user should be taken to 6th question
    */
  test('Verify user will be moved to 6th question incase if he selects option other than none of the abv or "I’m not sure and would like to speak to someone"', async ({ page }) => {
    await page1.getByText(`Soon to be discharged from`).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()
    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');
    await page1.getByText('How do I determine my loved').click();
    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByText('May or may not require help').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Indicate the level of')).toBeVisible()
    await page1.locator('fieldset').filter({ hasText: 'FeedingDoes not require any' }).locator('span').first().click();
    await page1.locator('fieldset').filter({ hasText: 'BathingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'ToiletingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'DressingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'MovingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'TransferringDoes not require' }).locator('span').first().click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Medical condition');
    await page1.getByText('Physically weaker in the past').click();
    await page1.locator('label').filter({ hasText: 'Recent stroke' }).click();
    await page1.locator('label').filter({ hasText: 'Recent hip fracture' }).click();
    await page1.getByText('Dementia (diagnosed by a').click();
    await page1.getByText('Mental health symptoms or').click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following caregiving support will help you in caring for your loved one?');
    await page1.getByText('Help/advice from caregiver').click()
    await expect(page1.getByRole('main')).toContainText('What support services do your loved one need at home?');
    await page1.getByText('Meal delivery (e.g.').click();
    await page1.locator('label').filter({ hasText: 'Showering' }).click();
    await page1.getByText('Light housekeeping (e.g.').click();
    await page1.getByText('Eldersitting (e.g. someone to').click();
    await page1.locator('label').filter({ hasText: 'Going to medical appointments' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following future plans (i.e. financial, legal and health plans) have you made for your loved one?');
  });

  /*
 Given user lands on sixth question
 And selects option none of the above
 Then rest all options should be disabled
 */
  test('Verify user will be moved to 6th question and when if he selects option none of the abv then rest all options should be disabled', async ({ page }) => {
    await page1.getByText(`Soon to be discharged from`).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()
    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');
    await page1.getByText('How do I determine my loved').click();
    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByText('May or may not require help').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Indicate the level of')).toBeVisible()
    await page1.locator('fieldset').filter({ hasText: 'FeedingDoes not require any' }).locator('span').first().click();
    await page1.locator('fieldset').filter({ hasText: 'BathingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'ToiletingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'DressingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'MovingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'TransferringDoes not require' }).locator('span').first().click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Medical condition');
    await page1.getByText('Physically weaker in the past').click();
    await page1.locator('label').filter({ hasText: 'Recent stroke' }).click();
    await page1.locator('label').filter({ hasText: 'Recent hip fracture' }).click();
    await page1.getByText('Dementia (diagnosed by a').click();
    await page1.getByText('Mental health symptoms or').click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following caregiving support will help you in caring for your loved one?');
    await page1.getByText('Help/advice from caregiver').click()
    await expect(page1.getByRole('main')).toContainText('What support services do your loved one need at home?');
    await page1.getByText('Meal delivery (e.g.').click();
    await page1.locator('label').filter({ hasText: 'Showering' }).click();
    await page1.getByText('Light housekeeping (e.g.').click();
    await page1.getByText('Eldersitting (e.g. someone to').click();
    await page1.locator('label').filter({ hasText: 'Going to medical appointments' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following future plans (i.e. financial, legal and health plans) have you made for your loved one?');
    await page1.getByText('None of the above').click()
    const options = await page1.locator("input").all()
    for (let i = 0; i < options.length; i++) {
      if (i == 3)
        break;
      expect(await options.at(i)?.isEditable()).toBeFalsy()
    }
  });
  /*
 Given user lands on sixth question
 And selects any option other than none of the above
 Then on clicking next button 
 Then user should move to form submission page
 When user can click yes button
 Then user will be asked few more questions
 And user answers rest questions
 Ans user lands on recommendations page
 */
  test('Verify user will be asked more questions on clicking yes button', async ({ page }) => {
    await page1.getByText(`Soon to be discharged from`).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()
    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');
    await page1.getByText('How do I determine my loved').click();
    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByText('May or may not require help').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Indicate the level of')).toBeVisible()
    await page1.locator('fieldset').filter({ hasText: 'FeedingDoes not require any' }).locator('span').first().click();
    await page1.locator('fieldset').filter({ hasText: 'BathingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'ToiletingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'DressingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'MovingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'TransferringDoes not require' }).locator('span').first().click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Medical condition');
    await page1.getByText('Physically weaker in the past').click();
    await page1.locator('label').filter({ hasText: 'Recent stroke' }).click();
    await page1.locator('label').filter({ hasText: 'Recent hip fracture' }).click();
    await page1.getByText('Dementia (diagnosed by a').click();
    await page1.getByText('Mental health symptoms or').click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following caregiving support will help you in caring for your loved one?');
    await page1.getByText('Help/advice from caregiver').click()
    await expect(page1.getByRole('main')).toContainText('What support services do your loved one need at home?');
    await page1.getByText('Meal delivery (e.g.').click();
    await page1.locator('label').filter({ hasText: 'Showering' }).click();
    await page1.getByText('Light housekeeping (e.g.').click();
    await page1.getByText('Eldersitting (e.g. someone to').click();
    await page1.locator('label').filter({ hasText: 'Going to medical appointments' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following future plans (i.e. financial, legal and health plans) have you made for your loved one?');
    await page1.getByText('Will', { exact: true }).click()
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Would you like to answer a few more questions to find financial assistance relevant to your loved one?');
    await page1.getByRole('button', { name: 'Yes' }).click();
    await expect(page1.getByRole('main')).toContainText('Loved one\'s personal details');
    await page1.getByText('Singapore Citizen').click();
    await page1.locator('label').filter({ hasText: 'Yes' }).first().click();
    await page1.getByText('CareShield Life').click();
    await page1.locator('label').filter({ hasText: 'No' }).nth(3).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByPlaceholder('E.g. 3').click();
    await page1.getByPlaceholder('E.g. 3').fill('5');
    await page1.locator('div').filter({ hasText: /^S\$$/ }).click();
    await page1.getByPlaceholder('E.g. 2,000').fill('3000.00');
    await page1.getByRole('button', { name: 'View results' }).click();
    await expect(page1.getByRole('main')).toContainText('Recommended for you');
  });

  /*
Given user lands on sixth question
And selects any option other than none of the above
Then on clicking next button 
Then user should move to form submission page
When user can click back button
Then user will be shown sixth question again
*/
  test('Verify user will be shown sixth question again on clicking back button', async ({ page }) => {
    await page1.getByText(`Soon to be discharged from`).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()
    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');
    await page1.getByText('How do I determine my loved').click();
    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByText('May or may not require help').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Indicate the level of')).toBeVisible()
    await page1.locator('fieldset').filter({ hasText: 'FeedingDoes not require any' }).locator('span').first().click();
    await page1.locator('fieldset').filter({ hasText: 'BathingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'ToiletingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'DressingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'MovingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'TransferringDoes not require' }).locator('span').first().click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Medical condition');
    await page1.getByText('Physically weaker in the past').click();
    await page1.locator('label').filter({ hasText: 'Recent stroke' }).click();
    await page1.locator('label').filter({ hasText: 'Recent hip fracture' }).click();
    await page1.getByText('Dementia (diagnosed by a').click();
    await page1.getByText('Mental health symptoms or').click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following caregiving support will help you in caring for your loved one?');
    await page1.getByText('Help/advice from caregiver').click()
    await expect(page1.getByRole('main')).toContainText('What support services do your loved one need at home?');
    await page1.getByText('Meal delivery (e.g.').click();
    await page1.locator('label').filter({ hasText: 'Showering' }).click();
    await page1.getByText('Light housekeeping (e.g.').click();
    await page1.getByText('Eldersitting (e.g. someone to').click();
    await page1.locator('label').filter({ hasText: 'Going to medical appointments' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following future plans (i.e. financial, legal and health plans) have you made for your loved one?');
    await page1.getByText('Will', { exact: true }).click()
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByRole('button', { name: 'Back' }).click();
    await expect(page1.getByRole('main')).toContainText('What is Will, LPA, Deputyship or ACP?');
  });

  /*
 Given user lands on sixth question
 And selects any option other than none of the above
 Then on clicking next button 
 Then user should move to form submission page
 When user can click "No,skip to results" button
 Then user will be shown recommendations
 */
  test('Verify user should land on recommendations on clicking "No,skip to results" button', async ({ page }) => {
    await page1.getByText(`Soon to be discharged from`).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()
    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');
    await page1.getByText('How do I determine my loved').click();
    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByText('May or may not require help').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Indicate the level of')).toBeVisible()
    await page1.locator('fieldset').filter({ hasText: 'FeedingDoes not require any' }).locator('span').first().click();
    await page1.locator('fieldset').filter({ hasText: 'BathingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'ToiletingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'DressingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'MovingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'TransferringDoes not require' }).locator('span').first().click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Medical condition');
    await page1.getByText('Physically weaker in the past').click();
    await page1.locator('label').filter({ hasText: 'Recent stroke' }).click();
    await page1.locator('label').filter({ hasText: 'Recent hip fracture' }).click();
    await page1.getByText('Dementia (diagnosed by a').click();
    await page1.getByText('Mental health symptoms or').click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following caregiving support will help you in caring for your loved one?');
    await page1.getByText('Help/advice from caregiver').click()
    await expect(page1.getByRole('main')).toContainText('What support services do your loved one need at home?');
    await page1.getByText('Meal delivery (e.g.').click();
    await page1.locator('label').filter({ hasText: 'Showering' }).click();
    await page1.getByText('Light housekeeping (e.g.').click();
    await page1.getByText('Eldersitting (e.g. someone to').click();
    await page1.locator('label').filter({ hasText: 'Going to medical appointments' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following future plans (i.e. financial, legal and health plans) have you made for your loved one?');
    await page1.getByText('Will', { exact: true }).click()
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByRole('button', { name: 'No, skip to results' }).click();
    await expect(page1.getByRole('main')).toContainText('Recommended for you');
    await expect(page1.getByLabel('Community Intervention Team (COMIT)', { exact: true })).toContainText('Community Intervention Team (COMIT)');
    await expect(page1.getByLabel('Community Rehabilitation Centre', { exact: true })).toContainText('Community Rehabilitation Centre');
  });

  /*
  Given user lands on fifth question
  And selects "none of the abv option"
  And on clicking next button
  Then user should be taken to form submission page
  When user clicks back button then he should be shown fifth question
  When user clicks "Yes"
  Then user should be asked few more questions
  Then post answering rest questions
  Then user should be shown recommendations
  When user clicks any recommendation 
  Then new tab should be opened
  And user should be navigated to respective recommendation page
  */
  test('Verify in fifth question when use clicks "none of the above" option then user will be moved to form submission page where in user selects "yes" btn and answers few more questions and lands on recommendations', async ({ page }) => {
    await page1.getByText(`Soon to be discharged from`).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()
    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');
    await page1.getByText('How do I determine my loved').click();
    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByText('May or may not require help').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Indicate the level of')).toBeVisible()
    await page1.locator('fieldset').filter({ hasText: 'FeedingDoes not require any' }).locator('span').first().click();
    await page1.locator('fieldset').filter({ hasText: 'BathingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'ToiletingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'DressingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'MovingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'TransferringDoes not require' }).locator('span').first().click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Medical condition');
    await page1.getByText('Physically weaker in the past').click();
    await page1.locator('label').filter({ hasText: 'Recent stroke' }).click();
    await page1.locator('label').filter({ hasText: 'Recent hip fracture' }).click();
    await page1.getByText('Dementia (diagnosed by a').click();
    await page1.getByText('Mental health symptoms or').click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following caregiving support will help you in caring for your loved one?');
    await page1.getByText('Help/advice from caregiver').click()
    await expect(page1.getByRole('main')).toContainText('What support services do your loved one need at home?');
    await page1.getByText('Meal delivery (e.g.').click();
    await page1.locator('label').filter({ hasText: 'Showering' }).click();
    await page1.getByText('Light housekeeping (e.g.').click();
    await page1.getByText('Eldersitting (e.g. someone to').click();
    await page1.locator('label').filter({ hasText: 'Going to medical appointments' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following future plans (i.e. financial, legal and health plans) have you made for your loved one?');
    await page1.getByText('None of the above').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Would you like to answer a few more questions to find financial assistance relevant to your loved one?');
    await page1.getByRole('button', { name: 'Back' }).click();
    await expect(page1.getByRole('main')).toContainText('What is Will, LPA, Deputyship or ACP?');
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByRole('button', { name: 'Yes' }).click();
    await expect(page1.getByRole('main')).toContainText('Loved one\'s personal details');
    await page1.getByText('Singapore Citizen').click();
    await page1.locator('label').filter({ hasText: 'No' }).first().click();
    await page1.locator('label').filter({ hasText: 'ElderShield' }).click();
    await page1.locator('label').filter({ hasText: 'Yes' }).nth(1).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByPlaceholder('E.g. 3').fill('5');
    await page1.getByPlaceholder('E.g. 2,000').fill('4000.00');
    await page1.getByRole('button', { name: 'View results' }).click();
    await expect(page1.getByRole('main')).toContainText('Recommended for you');
    await expect(page1.getByLabel('Community Intervention Team (COMIT)', { exact: true })).toContainText('Community Intervention Team (COMIT)');
    const page2Promise = page1.waitForEvent('popup');
    await page1.getByLabel('Community Intervention Team (COMIT)', { exact: true }).click();
    const page2 = await page2Promise;
    await expect(page2.getByRole('main')).toContainText('Community Intervention Team (COMIT)');
  });

  /*
 Given user lands on fifth question
 And selects "none of the abv option"
 And on clicking next button
 Then user should be taken to form submission page
 When user clicks back button then he should be shown fifth question
 When user clicks "No" button
 Then user should be shown recommendations
 When user clicks any recommendation 
 Then new tab should be opened
 And user should be navigated to respective recommendation page
 */
  test('Verify in fifth question when use clicks "No,skip to results" option then user will be moved to recommendations', async ({ page }) => {
    await page1.getByText(`Soon to be discharged from`).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Physical condition', { exact: true })).toBeVisible()
    await expect(page1.getByRole('group')).toContainText('Which one of the following best describes your loved one’s physical condition at home?');
    await page1.getByText('How do I determine my loved').click();
    await expect(page1.getByRole('dialog')).toContainText('How do I determine my loved one’s physical condition?');
    await page1.getByRole('button', { name: 'Close' }).click();
    await page1.getByText('May or may not require help').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByText('Indicate the level of')).toBeVisible()
    await page1.locator('fieldset').filter({ hasText: 'FeedingDoes not require any' }).locator('span').first().click();
    await page1.locator('fieldset').filter({ hasText: 'BathingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'ToiletingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'DressingDoes not require any' }).locator('span').nth(1).click();
    await page1.locator('fieldset').filter({ hasText: 'MovingDoes not require any' }).locator('span').nth(2).click();
    await page1.locator('fieldset').filter({ hasText: 'TransferringDoes not require' }).locator('span').first().click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Medical condition');
    await page1.getByText('Physically weaker in the past').click();
    await page1.locator('label').filter({ hasText: 'Recent stroke' }).click();
    await page1.locator('label').filter({ hasText: 'Recent hip fracture' }).click();
    await page1.getByText('Dementia (diagnosed by a').click();
    await page1.getByText('Mental health symptoms or').click();
    await page1.locator('label').filter({ hasText: 'Yes' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following caregiving support will help you in caring for your loved one?');
    await page1.getByText('Help/advice from caregiver').click()
    await expect(page1.getByRole('main')).toContainText('What support services do your loved one need at home?');
    await page1.getByText('Meal delivery (e.g.').click();
    await page1.locator('label').filter({ hasText: 'Showering' }).click();
    await page1.getByText('Light housekeeping (e.g.').click();
    await page1.getByText('Eldersitting (e.g. someone to').click();
    await page1.locator('label').filter({ hasText: 'Going to medical appointments' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Which of the following future plans (i.e. financial, legal and health plans) have you made for your loved one?');
    await page1.getByText('None of the above').click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await expect(page1.getByRole('main')).toContainText('Would you like to answer a few more questions to find financial assistance relevant to your loved one?');
    await page1.getByRole('button', { name: 'No, skip to results' }).click();
    await expect(page1.getByRole('main')).toContainText('Recommended for you');
    await expect(page1.getByLabel('Community Intervention Team (COMIT)', { exact: true })).toContainText('Community Intervention Team (COMIT)');
    const page2Promise = page1.waitForEvent('popup');
    await page1.getByLabel('Community Intervention Team (COMIT)', { exact: true }).click();
    const page2 = await page2Promise;
    await expect(page2.getByRole('main')).toContainText('Community Intervention Team (COMIT)');
  });
});





