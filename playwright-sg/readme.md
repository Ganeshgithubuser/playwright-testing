Pre-requsites:
Install latest nodejs in your machine so that you can javascript files
Install vscode


Steps to run the testcases : 
1. Open the project in vscode
2. Do "npm install" by opening new terminal
3. To install playwright browsers do "npx playwright install" in terminal
4. Install the playwright test vscode extension which recognises the tests through which you can run the tests 
(Or)
run the commands listed in package.json
5. In the terminal if you run "npm run test" it will run all the tests in headless mode
6. To run tests in headed mode use npm run test --headed
7. To verify all the campaign questions text content we have created one json called Options.json where we have kept question and related options data and we are reading and checking them in script file i.e CareServicesRecommenderOptions.spec 
8. we have added couple of testcases apart from above mentioned (i.e abv in point 7) in CareServicesRecommender.spec file.

