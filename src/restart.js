#!/usr/bin/env node

const puppeteer = require('puppeteer');

const ROUTER_ADDRESS = 'http://192.168.1.254/';

const delay = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const sleep = async debugging => {
  if (debugging) {
    await delay(5000);
  } else {
    await delay(5000);
  }
};

const runProcess = (password, debugging, verbose, executablePath) =>
  new Promise((resolve, reject) => {
    console.log(`Accessing router`);

    const puppeteerArgs = { headless: !debugging };
    if (executablePath) {
      puppeteerArgs.executablePath = executablePath;
    }

    puppeteer.launch(puppeteerArgs).then(async browser => {
      const page = await browser.newPage();
      await page.goto(ROUTER_ADDRESS);

      const restartButtonElement = await page.$('#restart_ti_one_text');
      if (verbose) {
        console.log(`restartButtonElement`, restartButtonElement);
      }
      if (!restartButtonElement) {
        reject(Error('Restart button not found.'));
      }

      // The restart button isn't actually a button, and the classes and click behaviour change on different mouse events.
      // Clicking it 3 times seems to trigger the behaviour we want.
      console.log(`Clicking restart`);
      restartButtonElement.click();
      await sleep(debugging);
      restartButtonElement.click();
      await sleep(debugging);
      restartButtonElement.click();

      await sleep(debugging);

      const passwordFieldElement = await page.$('#login_password_input_noshow');
      if (verbose) {
        console.log(`passwordFieldElement`, passwordFieldElement);
      }
      if (!passwordFieldElement) {
        reject('Password field not found.');
      }

      await sleep(debugging);

      console.log(`Typing password`, debugging ? password : '*********');
      await passwordFieldElement.focus();
      await page.keyboard.type(password);

      await sleep(debugging);

      const passwordOkButton = await page.$('#ok_button');
      if (verbose) {
        console.log(`passwordOkButton`, passwordOkButton);
      }
      if (!passwordOkButton) {
        reject('Password could not be submitted.');
      }

      console.log(`Submitting password`);
      await passwordOkButton.click();

      await sleep(debugging);

      // Check if the password was correct
      const passwordErrorElement = await page.$('#passwordTitle_yellow');
      if (verbose) {
        console.log(`passwordErrorElement`, passwordErrorElement);
      }
      if (passwordErrorElement) {
        reject('The password was not accepted.');
      }

      const finalRestartButtonElement = await page.$('.regular_button');
      if (verbose) {
        console.log(`finalRestartButtonElement`, finalRestartButtonElement);
      }
      if (!finalRestartButtonElement) {
        reject('Final restart button not found.');
      }

      await finalRestartButtonElement.click();

      await sleep(debugging);

      await browser.close();
      resolve('All done 👍');
    });
  });

export default runProcess;
