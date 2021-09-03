const webdriver = require('selenium-webdriver');

var username = process.env.BROWSERSTACK_USERNAME;
var accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
var buildName = process.env.BROWSERSTACK_BUILD_NAME;

async function runTestWithCaps (capabilities) {
  let driver = new webdriver.Builder()
    .usingServer('http://' + username + ':' + accessKey + '@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      ...capabilities['browser'] && { browserName: capabilities['browser']}  // Because NodeJS language binding requires browserName to be defined
    })
    .build();
  await driver.get("http://www.google.com");
  const inputField = await driver.findElement(webdriver.By.name("q"));
  await inputField.sendKeys("BrowserStack", webdriver.Key.ENTER); // this submits on desktop browsers
  try {
    await driver.wait(webdriver.until.titleMatches(/BrowserStack/i), 5000);
  } catch (e) {
    await inputField.submit(); // this helps in mobile browsers
  }
  try {
    await driver.wait(webdriver.until.titleMatches(/BrowserStack/i), 5000);
    console.log(await driver.getTitle());
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Title contains BrowserStack!"}}'
    );
  } catch (e) {
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Page could not load in time"}}'
    );
  }
  await driver.quit();
}
const capabilities1 = {
    'device': 'iPhone 12 Pro Max',
    'os_version': '14',
    'browserName': 'ios',
    'realMobile': 'true',
    'name': 'Parallel test 1',
    'browserstack.debug': 'true',  // for enabling visual logs
    'browserstack.console': 'info',  // to enable console logs at the info level. You can also use other log levels here
    'browserstack.networkLogs': 'true',
    "build" : buildName, // CI/CD job name using BROWSERSTACK_BUILD_NAME env variable
	"browserstack.user" : username,
	"browserstack.key" : accessKey
}
const capabilities2 = {
    'browser': 'firefox',
    'browser_version': 'latest',
    'os': 'Windows',
    'os_version': '10',
    'name': 'Parallel test 2',
    'browserstack.debug': 'true',  // for enabling visual logs
    'browserstack.console': 'info',  // to enable console logs at the info level. You can also use other log levels here
    'browserstack.networkLogs': 'true',
    "build" : buildName, // CI/CD job name using BROWSERSTACK_BUILD_NAME env variable
	"browserstack.user" : username,
	"browserstack.key" : accessKey
}
const capabilities3 = {
    'browser': 'safari',
    'browser_version': 'latest',
    'os': 'OS X',
    'os_version': 'Big Sur',
    'name': 'Parallel test 3',
    'browserstack.debug': 'true',  // for enabling visual logs
    'browserstack.console': 'info',  // to enable console logs at the info level. You can also use other log levels here
    'browserstack.networkLogs': 'true',
    "build" : buildName, // CI/CD job name using BROWSERSTACK_BUILD_NAME env variable
	"browserstack.user" : username,
	"browserstack.key" : accessKey
}
const capabilities4 = {
    'browser': 'Chrome',
    'browser_version': 'latest-beta',
    'os': 'Windows',
    'os_version': '8.1',
    'name': 'Parallel test 4',
    'browserstack.debug': 'true',  // for enabling visual logs
    'browserstack.console': 'info',  // to enable console logs at the info level. You can also use other log levels here
    'browserstack.networkLogs': 'true',
    "build" : buildName, // CI/CD job name using BROWSERSTACK_BUILD_NAME env variable
	"browserstack.user" : username,
	"browserstack.key" : accessKey
}
const capabilities5 = {
    'device': 'Google Pixel 5',
    'browserName': 'Android',
    'os_version': '11.0',
    'real_mobile': 'true',
    'name': 'Parallel test 5',
    'browserstack.debug': 'true',  // for enabling visual logs
    'browserstack.console': 'info',  // to enable console logs at the info level. You can also use other log levels here
    'browserstack.networkLogs': 'true',
    "build" : buildName, // CI/CD job name using BROWSERSTACK_BUILD_NAME env variable
	"browserstack.user" : username,
	"browserstack.key" : accessKey
};
runTestWithCaps(capabilities1);
runTestWithCaps(capabilities2);
runTestWithCaps(capabilities3);
runTestWithCaps(capabilities4);
runTestWithCaps(capabilities5);