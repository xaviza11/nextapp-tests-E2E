const { startBrowser, openPage, closeBrowser, extractElement, typeInInput, clickElement } = require('../../puppeterFunctions');

describe('Test if /register route renders whitout errors', () => {
  beforeAll(async () => {
    await startBrowser();
  });

  afterAll(async () => {
    await closeBrowser();
  });

  let page

  test('setup page', async () => {
    page = await openPage('register');
    setTimeout(() => {
      expect(true)
    }, 5000)
  })

 test('test nabvar renders correctly', async () => {
    const extractedElement = await extractElement(page, '#navbar')
    expect(extractedElement).toContain('SocialEv');
    expect(extractedElement).toContain('Sign In');
    expect(extractedElement).toContain('Register');
    expect(extractedElement).toContain('About');
  }, 20000);

  test('test form renders correctly', async () => {
    const extractedElement = await extractElement(page, '#formRegister')
    expect(extractedElement).toContain('Sign Up');
    expect(extractedElement).toContain('Email');
    expect(extractedElement).toContain('Password');
    expect(extractedElement).toContain('Full Name');
    expect(extractedElement).toContain('Enter your Email');
    expect(extractedElement).toContain('Enter your Password');
    expect(extractedElement).toContain('Enter your Full Name');
    expect(extractedElement).toContain('buttonRegister');
  }, 20000);

  test('test if Register throws error when pasword not valid length', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = '1Aas';
    await typeInInput(selectorPassword, textPassword, page);

    const selectorFullName = 'input[name="fullname"]';
    const textFullName = 'fullname1';
    await typeInInput(selectorFullName, textFullName, page);

    await clickElement('#buttonRegister', page)

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
              if (statusText === 'warning' && messageText === "Password must be at least 8 characters long.") setTimeout(() => {resolve(true)}, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    expect(isAlertPresent).toBeTruthy();
    await page.$eval(selectorFullName, el => el.value = '');
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Register throws error when pasword not has almost one lowecase letter', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = '1ABBBBBBBBBBBBBBBBBBB';
    await typeInInput(selectorPassword, textPassword, page);

    const selectorFullName = 'input[name="fullname"]';
    const textFullName = 'fullname1';
    await typeInInput(selectorFullName, textFullName, page);

    await clickElement('#buttonRegister', page)

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
              if (statusText === 'warning' && messageText ===  "Password must contain at least one lowercase letter.") setTimeout(() => {resolve(true)}, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    expect(isAlertPresent).toBeTruthy();
    await page.$eval(selectorFullName, el => el.value = '');
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Register throws error when pasword not has almost one uppercase letter', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = '1bbbbbbbbbbbbbbbbbbbbbbbbb';
    await typeInInput(selectorPassword, textPassword, page);

    const selectorFullName = 'input[name="fullname"]';
    const textFullName = 'fullname1';
    await typeInInput(selectorFullName, textFullName, page);

    await clickElement('#buttonRegister', page)

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
              if (statusText === 'warning' && messageText ===  "Password must contain at least one uppercase letter.") setTimeout(() => {resolve(true)}, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    expect(isAlertPresent).toBeTruthy();
    await page.$eval(selectorFullName, el => el.value = '');
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Register throws error when pasword not has almost one number', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = 'Bbbbbbbbbbbbbbbbbbbbbbbbbb';
    await typeInInput(selectorPassword, textPassword, page);

    const selectorFullName = 'input[name="fullname"]';
    const textFullName = 'fullname1';
    await typeInInput(selectorFullName, textFullName, page);

    await clickElement('#buttonRegister', page)

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
              if (statusText === 'warning' && messageText ===  "Password must contain at least one digit.") setTimeout(() => {resolve(true)}, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    expect(isAlertPresent).toBeTruthy();
    await page.$eval(selectorFullName, el => el.value = '');
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)


  test('test if Register throws error when pasword has spaces', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = 'Bbbbbb1bbbbbbbb bbbbbbbbbbbb';
    await typeInInput(selectorPassword, textPassword, page);

    const selectorFullName = 'input[name="fullname"]';
    const textFullName = 'fullname1';
    await typeInInput(selectorFullName, textFullName, page);

    await clickElement('#buttonRegister', page)

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
              if (statusText === 'warning' && messageText ===  "The password can not contain spaces") setTimeout(() => {resolve(true)}, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    expect(isAlertPresent).toBeTruthy()
    await page.$eval(selectorFullName, el => el.value = '');
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Register throws error when pasword has special characters', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = 'Bbbbb1bbbbbbbbbb<bbbbbbbbb';
    await typeInInput(selectorPassword, textPassword, page);

    const selectorFullName = 'input[name="fullname"]';
    const textFullName = 'fullname1';
    await typeInInput(selectorFullName, textFullName, page);

    await clickElement('#buttonRegister', page)

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
              if (statusText === 'warning' && messageText ===  "Password can not contain special characters") setTimeout(() => {resolve(true)}, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    expect(isAlertPresent).toBeTruthy()
    await page.$eval(selectorFullName, el => el.value = '');
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Register throws error when name length is less than two letters', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = 'Bbbbb1bbbbbbbbbbbbbbbbbbb';
    await typeInInput(selectorPassword, textPassword, page);

    const selectorFullName = 'input[name="fullname"]';
    const textFullName = 'f';
    await typeInInput(selectorFullName, textFullName, page);

    await clickElement('#buttonRegister', page)

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
              if (statusText === 'warning' && messageText ===  "Name must have at least two characters") setTimeout(() => {resolve(true)}, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    expect(isAlertPresent).toBeTruthy()
    await page.$eval(selectorFullName, el => el.value = '');
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Register throws error when user already exist', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor@tilla.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = 'Bbbbb1bbbbbbbbbbbbbbbbbbb';
    await typeInInput(selectorPassword, textPassword, page);

    const selectorFullName = 'input[name="fullname"]';
    const textFullName = 'fulln';
    await typeInInput(selectorFullName, textFullName, page);

    await clickElement('#buttonRegister', page)

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
              if (statusText === 'warning' && messageText ===  "User already exist") setTimeout(() => {resolve(true)}, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    expect(isAlertPresent).toBeTruthy()
    await page.$eval(selectorFullName, el => el.value = '');
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)


  test('test if Register nav to Home when credentials are correct', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor1@tilla1.com';
    await typeInInput(selectorEmail, textEmail, page);

    const selectorPassword = 'input[name="password"]';
    const textPassword = '1Aasdfghjklñ';
    await typeInInput(selectorPassword, textPassword, page);

    const selectorFullName = 'input[name="fullname"]';
    const textFullName = 'fullname1';
    await typeInInput(selectorFullName, textFullName, page);

    await clickElement('#buttonRegister', page)

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
    expect(isHomeOpen).toBeTruthy()
  }, 20000)
});
