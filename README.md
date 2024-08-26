Pre-requsites: 
Install latest nodejs in your machine so that you can javascript files
Install vscode

Steps to run the testcases :
Open the project in vscode
Do "npm install" by opening new terminal
To install playwright browsers do "npx playwright install" in terminal
Install the playwright test vscode extension which recognises the tests through which you can run the tests (Or) run the commands listed in package.json
In the terminal if you run "npm run test" it will run all the tests in headless mode
To run tests in headed mode use npm run test --headed
To verify all the campaign questions text content we have created one json called Options.json where we have kept question and related options data and we are reading and checking them in script file i.e CareServicesRecommenderOptions.spec
we have added couple of testcases apart from above mentioned (i.e abv in point 7) in CareServicesRecommender.spec file.
