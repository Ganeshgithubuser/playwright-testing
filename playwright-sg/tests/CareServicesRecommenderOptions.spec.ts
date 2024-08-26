import { test, expect, Page } from '@playwright/test';
import Options from '../Options.json'

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

  test(`Verify ${Options.Questions.at(0)?.question} options text`, {
    tag: '@options',
  }, async ({ page }) => {
    //@ts-ignore
    for (let i = 0; i < Options.Questions.at(0)?.options.length; i++)
      await expect(page1.getByText(`${Options.Questions.at(0)?.options[i]}`, { exact: true })).toBeVisible()
  });

  test(`Verify ${Options.Questions.at(1)?.question} options text`, {
    tag: '@options',
  }, async ({ page }) => {
    await page1.getByText('Living at home').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    //@ts-ignore
    for (let i = 0; i < Options.Questions.at(1)?.options.length; i++)
      await expect(page1.getByText(`${Options.Questions.at(1)?.options[i]}`, { exact: true })).toBeVisible()
  });

  test(`Verify ${Options.Questions.at(2)?.question} options text`, {
    tag: '@options',
  }, async ({ page }) => {
    await page1.getByText('Living at home').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Bedbound').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    //@ts-ignore
    for (let i = 0; i < Options.Questions.at(2)?.options.length; i++)
      await expect(page1.locator(`//span[normalize-space()='${Options.Questions.at(2)?.options[i]}']`)).toBeVisible()
  });

  test(`Verify ${Options.Questions.at(3)?.question} options text`, {
    tag: '@options',
  }, async ({ page }) => {
    await page1.getByText('Living at home').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Bedbound').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Recent stroke').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    //@ts-ignore
    for (let i = 0; i < Options.Questions.at(3)?.options.length; i++)
      await expect(page1.locator(`//span[normalize-space()='${Options.Questions.at(3)?.options[i]}']`)).toBeVisible()
    //click on caregiver training option so that next question appears and can be validated
    await page1.getByText('Caregiver training').click()
    //@ts-ignore
    await expect(page1.locator(`//*[normalize-space()='${Options.Questions.at(4)?.question}']`)).toBeVisible()
    //@ts-ignore
    for (let i = 0; i < Options.Questions.at(4)?.options.length; i++)
      await expect(page1.locator(`//span[normalize-space()='${Options.Questions.at(4)?.options[i]}']`).first()).toBeVisible()
  });

  test(`Verify ${Options.Questions.at(5)?.question} options text`, {
    tag: '@options',
  }, async ({ page }) => {
    await page1.getByText('Living at home').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Bedbound').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Recent stroke').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    //click on caregiver training option so that next question appears and can be validated
    await page1.getByText('Caregiver training').click()
    //@ts-ignore
    await expect(page1.locator(`//*[normalize-space()='${Options.Questions.at(4)?.question}']`)).toBeVisible()
    await page1.getByText('Showering').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    //@ts-ignore
    for (let i = 0; i < Options.Questions.at(5)?.options.length; i++)
      await expect(page1.locator(`//span[normalize-space()='${Options.Questions.at(5)?.options[i]}']`)).toBeVisible()

  });

  test(`Verify ${Options.Questions.at(6)?.question} options text`, {
    tag: '@options',
  }, async ({ page }) => {
    await page1.getByText('Living at home').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Bedbound').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Recent stroke').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Caregiver training').click()
    await page1.getByText('Showering').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Will', { exact: true }).click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByRole('button', { name: 'Yes' }).click()
    //@ts-ignore
    await expect(page1.locator(`//*[normalize-space()='${Options.Questions.at(6)?.question}']`).first()).toBeVisible()
    //@ts-ignore
    for (let i = 0; i < Options.Questions.at(6)?.options.length; i++)
      await expect(page1.locator(`//span[normalize-space()='${Options.Questions.at(6)?.options[i]}']`)).toBeVisible()
    //in the same page verifing 7,8,9 questions also exists so verifying same
    //@ts-ignore
    await expect(page1.locator(`//*[normalize-space()='${Options.Questions.at(7)?.question}']`).first()).toBeVisible()
    //@ts-ignore
    for (let i = 0; i < Options.Questions.at(7)?.options.length; i++)
      await expect(page1.locator(`//span[normalize-space()='${Options.Questions.at(7)?.options[i]}']`).first()).toBeVisible()
    //question-8 options verifying below
    //@ts-ignore
    await expect(page1.locator(`//*[normalize-space()='${Options.Questions.at(8)?.question}']`).first()).toBeVisible()
    //@ts-ignore
    for (let i = 0; i < Options.Questions.at(8)?.options.length; i++)
      await expect(page1.locator(`//span[normalize-space()='${Options.Questions.at(8)?.options[i]}']`).first()).toBeVisible()
    //@ts-ignore
    await expect(page1.locator(`//*[normalize-space()='${Options.Questions.at(9)?.question}']`).first()).toBeVisible()
    //@ts-ignore
    for (let i = 0; i < Options.Questions.at(9)?.options.length; i++)
      await expect(page1.locator(`//span[normalize-space()='${Options.Questions.at(9)?.options[i]}']`).nth(1)).toBeVisible()
  });


  test(`Verify ${Options.Questions.at(10)?.question} options text`, {
    tag: '@options',
  }, async ({ page }) => {
    await page1.getByText('Living at home').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Bedbound').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Recent stroke').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Caregiver training').click()
    await page1.getByText('Showering').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Will', { exact: true }).click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByRole('button', { name: 'Yes' }).click()
    await page1.getByText('Yes').first().click()
    await page1.getByText('Yes').nth(1).click()
    await page1.getByText('Singapore Citizen').click()
    await page1.getByText('CareShield Life').click()
    await page1.getByRole('button', { name: 'Next' }).click()
     //@ts-ignore
     await expect(page1.locator(`//*[normalize-space()='${Options.Questions.at(10)?.question}']`)).toBeVisible()
     //@ts-ignore
     for (let i = 0; i < Options.Questions.at(10)?.options.length; i++)
       await expect(page1.locator(`//span[normalize-space()='${Options.Questions.at(10)?.options[i]}']`)).toBeVisible()
  })
 //in the below testcase we are verifying full campaign
  test(`Verify e2e campaign and select some recommendation from recommendations list and verify the same`, {
    tag: '@e2e',
  }, async ({ page }) => {
    await page1.getByText('Living at home').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Bedbound').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Recent stroke').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Caregiver training').click()
    await page1.getByText('Showering').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('Will', { exact: true }).click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByRole('button', { name: 'Yes' }).click()
    await page1.getByText('Yes').first().click()
    await page1.getByText('Yes').nth(1).click()
    await page1.getByText('Singapore Citizen').click()
    await page1.getByText('CareShield Life').click()
    await page1.getByRole('button', { name: 'Next' }).click()
    await page1.getByText('No').nth(1).click()
     //@ts-ignore
     await expect(page1.locator(`//*[normalize-space()='${Options.Questions.at(11)?.question}']`)).toBeVisible()
     //@ts-ignore
     for (let i = 0; i < Options.Questions.at(11)?.options.length; i++)
       await expect(page1.locator(`//span[normalize-space()='${Options.Questions.at(11)?.options[i]}']`)).toBeVisible()
     //click on $21,000 and below (Most HDBs) option
     await page1.getByText("$21,000 and below (Most HDBs)").click()
     await page1.getByRole('button', { name: 'View Results' }).click()
     await expect(page1.getByRole('main')).toContainText('Recommended for you');
     await page1.getByText('Most relevant support to').click();
     await expect(page1.getByRole('main')).toContainText('Most relevant support to consider');
     const page2Promise = page1.waitForEvent('popup');
     await page1.getByLabel('Home Medical', { exact: true }).click();
     const page2 = await page2Promise;
     await expect(page2.getByRole('main')).toContainText('Home Medical');
     await expect(page2.getByTestId('mastheadSubtitle').locator('span')).toContainText('Check-ups, prescriptions and consultations by a doctor for seniors who are not able to leave their homes.');
     await expect(page2.locator('#accordion__heading-raa-0')).toContainText('About the service');
     await expect(page2.getByRole('main')).toContainText('SERVICE HIGHLIGHTS');
     await expect(page2.getByLabel('highlight 2').locator('span')).toContainText('Fees payable');
     await expect(page2.getByLabel('highlight 3').locator('span')).toContainText('Referral required');
     await expect(page2.getByLabel('About the service').getByRole('list')).toContainText('Medication prescription(s)');
     await expect(page2.getByLabel('About the service').getByRole('list')).toContainText('Caregiver education');
     await expect(page2.getByLabel('About the service').getByRole('list')).toContainText('Minor medical procedures');
     await expect(page2.getByLabel('About the service').getByRole('list')).toContainText('Management of stable medical condition(s)');
     await expect(page2.getByLabel('About the service').getByRole('list')).toContainText('Review and/or prescription of medications');
     await expect(page2.getByLabel('About the service').getByRole('list')).toContainText('Physical examinations');
     await page2.getByRole('button', { name: 'Who is it for?' }).click();
     await expect(page2.getByLabel('Who is it for?').getByRole('paragraph')).toContainText('Senior who is:');
     await expect(page2.getByLabel('Who is it for?').getByRole('list')).toContainText('Requires help with medical needs at home');
     await expect(page2.getByLabel('Who is it for?').getByRole('list')).toContainText('Singapore Citizen (SC), Permanent Resident (PR) or foreigner');
     await expect(page2.getByLabel('Who is it for?').getByRole('list')).toContainText('Frail and homebound');
     await page2.getByRole('button', { name: 'What to expect?' }).click();
     await expect(page2.getByLabel('What to expect?').locator('div')).toContainText('You need to prepare the latest medical report/doctor memo/hospital discharge summary of your loved one.');
     await page2.getByRole('button', { name: 'What to expect?' }).click();
     await page2.getByRole('button', { name: 'How to apply?' }).click();
     await expect(page2.getByLabel('How to apply?').getByRole('list')).toContainText('You will need to get a referral from a hospital, polyclinic or GP who is familiar with your loved ones’ condition and needs. You may also contact the service provider for a discussion.');
     await expect(page2.getByLabel('How to apply?').getByRole('list')).toContainText('For further assistance, contact the Agency for Integrated Care (AIC) at 1800 650 6060, email enquiries@aic.sg or walk in to a nearby AIC Link.');
     await page2.getByRole('button', { name: 'What to expect?' }).click();
     await expect(page2.getByLabel('What to expect?').locator('div')).toContainText('The medical report should not be older than 1 year from your application to the service.');
     await expect(page2.getByLabel('What to expect?').locator('div')).toContainText('Subsidies are available depending on the means-test result. Only applicable to SC and PR');
     await expect(page2.getByLabel('What to expect?').locator('div')).toContainText('Applicants for care services may need to fulfil the services’ eligibility criteria and providers’ service boundaries, if any, and enrolments are subject to availability of vacancies.');
     await expect(page2.getByLabel('What to expect?').locator('div')).toContainText('The medical report should include the following details: Diagnosis Clinical history Current functional status Cognitive and behavioural symptoms (if applicable) Drug allergy history and current list of medications');
     await expect(page2.locator('#service_detail_location_card_name_1')).toContainText('Metta Welfare Association');
     await expect(page2.locator('#sp-header')).toContainText('Service Providers');
     await page2.locator('#service_detail_location_card_show_more_detail_button_1').click();
     await expect(page2.getByRole('dialog')).toContainText('Metta Welfare Association');
     await expect(page2.getByRole('dialog')).toContainText('Address');
     await expect(page2.getByRole('dialog')).toContainText('32 Simei Street 1, 529950');
     await expect(page2.getByRole('dialog')).toContainText('Contact details65804688https://www.metta.org.sg/medical-care/#homecaremwa@metta.org.sg');
     await page2.locator('div').filter({ hasText: /^Operating hoursMon - Fri: 8\.30am - 5\.00pm$/ }).first().click();
     await expect(page2.getByRole('dialog')).toContainText('Operating hoursMon - Fri: 8.30am - 5.00pm');
  })
})