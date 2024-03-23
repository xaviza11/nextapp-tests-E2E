const { startBrowser, openPage, closeBrowser, extractElement, typeInInput, clickElement } = require('../puppeterFunctions');

describe('Test if / route renders whitout errors', () => {
  beforeAll(async () => {
    await startBrowser();
  });

  afterAll(async () => {
    await closeBrowser();
  });

  let page

  test('setUp page', async () => {
    page = await openPage('');
    expect(true)
  })

 test('test nabvar renders correctly', async () => {
    const extractedElement = await extractElement(page, '#navbar')
    expect(extractedElement).toContain('NextAuth');
    expect(extractedElement).toContain('Sign In');
    expect(extractedElement).toContain('Register');
    expect(extractedElement).toContain('About');
  }, 20000);

  test('test form renders correctly', async () => {
    const extractedElement = await extractElement(page, '#formLogin')
    expect(extractedElement).toContain('Sign In');
    expect(extractedElement).toContain('Email');
    expect(extractedElement).toContain('Password');
    expect(extractedElement).toContain('Enter your Email');
    expect(extractedElement).toContain('Enter your Password');
    expect(extractedElement).toContain('buttonLogin');
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
              if (statusText === 'warning' && messageText === 'User not exist') setTimeout(() => {resolve(true)}, 2000)
              else resolve(false)
            }
          }
          setTimeout(checkExistence, 500);
        };
        checkExistence();
      });
    });
    expect(isAlertPresent).toBeTruthy();
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Login throws error when pasword not valid', async () => {
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
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Login throws error when pasword not has almos one lowecase letter', async () => {
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
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Login throws error when pasword not has almos one uppercase letter', async () => {
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
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Login throws error when pasword not has almos one uppercase letter', async () => {
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
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Login throws error when pasword not has almos one number', async () => {
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
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
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
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
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
    await page.$eval(selectorEmail, el => el.value = '');
    await page.$eval(selectorPassword, el => el.value = '');
  }, 20000)

  test('test if Login nav to Home when credentials are correct', async () => {
    const selectorEmail = 'input[name="email"]';
    const textEmail = 'aitor@tilla.com';
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
    expect(isHomeOpen).toBeTruthy()
  }, 20000)
});
