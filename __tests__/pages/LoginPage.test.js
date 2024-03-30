const { startBrowser, openPage, closeBrowser, extractElement, typeInInput, clickElement } = require('../../puppeterFunctions');
const axios = require('axios')
const {host} = require('../../scrape.config')
const chalk = require('chalk')

describe('Test if / route renders whitout errors', () => {

  let page

  beforeAll(async () => {
    await startBrowser();
    console.log(chalk.blue('Page needs compilation'))
    try {
      console.log(chalk.blue('Starting compilation process'))
      page = await openPage('/pages/login');
      await page.waitForSelector('#navbar', { timeout: 1 });
    } catch (error) {
      await closeBrowser()
      console.log(chalk.green('Page has been compiled'))
      await startBrowser()
      page = await openPage('/pages/login');
      await page.waitForSelector('#navbar', { timeout: 10000 })
    }
  }, 30000);

  afterAll(async () => {
    await closeBrowser();
  });

  test('test nabvar renders correctly', async () => {
    const extractedElement = await extractElement(page, '#navbar')
    expect(extractedElement).toContain('FlightSimWay');
    expect(extractedElement).toContain('Sign In');
    expect(extractedElement).toContain('Register');
    expect(extractedElement).toContain('About');
  }, 20000);

  test('test form renders correctly', async () => {
    const extractedElement = await extractElement(page, '#formLogin')
    expect(extractedElement).toContain('Sign In');
    expect(extractedElement).toContain('Enter your Email');
    expect(extractedElement).toContain('Enter your Password');
    expect(extractedElement).toContain('Log In');
  }, 20000);

  test('test if Login throws error when user not exist', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'usuario@example.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = '1Aasdfghjklñ';
    await typeInInput(selectorPassword, textPassword, page);

    await clickElement('#buttonLogin', page)

    const isAlertPresent = await page.evaluate(() => {
      return new Promise(resolve => {
        const checkExistence = () => {
          const alertElement = document.querySelector('#alertComponent');
          if (alertElement) {
            const statusElement = alertElement.querySelector('h3:nth-child(1)');
            const messageElement = alertElement.querySelector('h3:nth-child(2)');
            if (statusElement && messageElement) {
              const statusText = statusElement.textContent.trim();
              const messageText = messageElement.textContent.trim();
              if (statusText === 'warning' && messageText === 'User not exist') setTimeout(() => { resolve(true) }, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });

    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
    expect(isAlertPresent).toBeTruthy();
  }, 20000)

  test('test if Login throws error when pasword not valid length', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = '1Aas';
    await typeInInput(selectorPassword, textPassword, page);

    await clickElement('#buttonLogin', page)

    const isAlertPresent = await page.evaluate(() => {
      return new Promise(resolve => {
        const checkExistence = () => {
          const alertElement = document.querySelector('#alertComponent');
          if (alertElement) {
            const statusElement = alertElement.querySelector('h3:nth-child(1)');
            const messageElement = alertElement.querySelector('h3:nth-child(2)');
            if (statusElement && messageElement) {
              const statusText = statusElement.textContent.trim();
              const messageText = messageElement.textContent.trim();
              if (statusText === 'warning' && messageText === "Password must be at least 8 characters long.") setTimeout(() => { resolve(true) }, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
    expect(isAlertPresent).toBeTruthy();
  }, 20000)

  test('test if Login throws error when pasword not has almost one lowecase letter', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = '1ABBBBBBBBBBBBBBBBBBB';
    await typeInInput(selectorPassword, textPassword, page);

    await clickElement('#buttonLogin', page)

    const isAlertPresent = await page.evaluate(() => {
      return new Promise(resolve => {
        const checkExistence = () => {
          const alertElement = document.querySelector('#alertComponent');
          if (alertElement) {
            const statusElement = alertElement.querySelector('h3:nth-child(1)');
            const messageElement = alertElement.querySelector('h3:nth-child(2)');
            if (statusElement && messageElement) {
              const statusText = statusElement.textContent.trim();
              const messageText = messageElement.textContent.trim();
              if (statusText === 'warning' && messageText === "Password must contain at least one lowercase letter.") setTimeout(() => { resolve(true) }, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
    expect(isAlertPresent).toBeTruthy();
  }, 20000)

  test('test if Login throws error when pasword not has almost one uppercase letter', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = '1bbbbbbbbbbbbbbbbbbbbbbbbb';
    await typeInInput(selectorPassword, textPassword, page);

    await clickElement('#buttonLogin', page)

    const isAlertPresent = await page.evaluate(() => {
      return new Promise(resolve => {
        const checkExistence = () => {
          const alertElement = document.querySelector('#alertComponent');
          if (alertElement) {
            const statusElement = alertElement.querySelector('h3:nth-child(1)');
            const messageElement = alertElement.querySelector('h3:nth-child(2)');
            if (statusElement && messageElement) {
              const statusText = statusElement.textContent.trim();
              const messageText = messageElement.textContent.trim();
              if (statusText === 'warning' && messageText === "Password must contain at least one uppercase letter.") setTimeout(() => { resolve(true) }, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
    expect(isAlertPresent).toBeTruthy();
  }, 20000)

  test('test if Login throws error when pasword not has almost one number', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = 'Bbbbbbbbbbbbbbbbbbbbbbbbbb';
    await typeInInput(selectorPassword, textPassword, page);

    await clickElement('#buttonLogin', page)

    const isAlertPresent = await page.evaluate(() => {
      return new Promise(resolve => {
        const checkExistence = () => {
          const alertElement = document.querySelector('#alertComponent');
          if (alertElement) {
            const statusElement = alertElement.querySelector('h3:nth-child(1)');
            const messageElement = alertElement.querySelector('h3:nth-child(2)');
            if (statusElement && messageElement) {
              const statusText = statusElement.textContent.trim();
              const messageText = messageElement.textContent.trim();
              if (statusText === 'warning' && messageText === "Password must contain at least one digit.") setTimeout(() => { resolve(true) }, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
    expect(isAlertPresent).toBeTruthy();
  }, 20000)


  test('test if Login throws error when pasword has spaces', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = 'Bbbbbb1bbbbbbbb bbbbbbbbbbbb';
    await typeInInput(selectorPassword, textPassword, page);

    await clickElement('#buttonLogin', page)

    const isAlertPresent = await page.evaluate(() => {
      return new Promise(resolve => {
        const checkExistence = () => {
          const alertElement = document.querySelector('#alertComponent');
          if (alertElement) {
            const statusElement = alertElement.querySelector('h3:nth-child(1)');
            const messageElement = alertElement.querySelector('h3:nth-child(2)');
            if (statusElement && messageElement) {
              const statusText = statusElement.textContent.trim();
              const messageText = messageElement.textContent.trim();
              if (statusText === 'warning' && messageText === "The password can not contain spaces") setTimeout(() => { resolve(true) }, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
    expect(isAlertPresent).toBeTruthy()
  }, 20000)

  test('test if Login throws error when pasword has special characters', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = 'Bbbbb1bbbbbbbbbb<bbbbbbbbb';
    await typeInInput(selectorPassword, textPassword, page);

    await clickElement('#buttonLogin', page)

    const isAlertPresent = await page.evaluate(() => {
      return new Promise(resolve => {
        const checkExistence = () => {
          const alertElement = document.querySelector('#alertComponent');
          if (alertElement) {
            const statusElement = alertElement.querySelector('h3:nth-child(1)');
            const messageElement = alertElement.querySelector('h3:nth-child(2)');
            if (statusElement && messageElement) {
              const statusText = statusElement.textContent.trim();
              const messageText = messageElement.textContent.trim();
              if (statusText === 'warning' && messageText === "Password can not contain special characters") setTimeout(() => { resolve(true) }, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
    expect(isAlertPresent).toBeTruthy()
  }, 20000)

  test('test if Login nav to Home when credentials are correct', async () => {

    await axios.post(host + 'api/auth/signup', {
      email: "aitor@tilla4.com",
      password: "1Aasdfghjklñ",
      fullname: "abcdfg",
      language: "en"
    })

    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor@tilla4.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = '1Aasdfghjklñ';
    await typeInInput(selectorPassword, textPassword, page);

    await clickElement('#buttonLogin', page)

    const isHomeOpen = await page.evaluate(() => {
      return new Promise(resolve => {
        const checkExistence = () => {
          const homeDiv = document.querySelector('#homePage');
          if (homeDiv) resolve(true)
          else setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });

    const cookies = await page.cookies();
    const tokenCookie  = cookies.find(cookie => cookie.name === 'token');
    await page.setCookie(tokenCookie )

    await axios.post(host + 'api/users/deleteUser', {
      password: "1Aasdfghjklñ",
      language: "en"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `${tokenCookie.name}=${tokenCookie.value}`
      },
    });

    expect(isHomeOpen).toBeTruthy()
  }, 20000)
});