#!/usr/bin/env node

const puppeteer = require('puppeteer');
const puppeteerCore = require('puppeteer-core');

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

const runProcess = (password, debugging, windowed, verbose, executablePath) =>
  new Promise((resolve, reject) => {
    console.log(`Accessing router`);

    let puppeteerInstance = puppeteer;

    const puppeteerArgs = { headless: !debugging && !windowed };
    if (executablePath) {
      puppeteerInstance = puppeteerCore;
      puppeteerArgs.executablePath = executablePath;
    }

    puppeteerInstance.launch(puppeteerArgs).then(async browser => {
      const page = await browser.newPage();
      await page.goto(ROUTER_ADDRESS);

      const restartButtonElement = await page.$('#restart');
      if (verbose) {
        console.log(`restartButtonElement`, restartButtonElement);
      }
      if (!restartButtonElement) {
        reject(Error('Restart button not found.'));
      }

      console.log(`Clicking restart`);
      // Because the restart element isn't actually a button, we need to simulate a click event on it.
      const restartPos = await restartButtonElement.boundingBox();

      if (verbose) {
        console.log(`restartPos`, restartPos);
      }

      const clickPos = { x: restartPos.x + 10, y: restartPos.y + 10 };
      await page.mouse.move(clickPos.x, clickPos.y);
      await sleep(windowed);
      await page.mouse.click(clickPos.x, clickPos.y);

      await sleep(windowed);

      const passwordFieldElement = await page.$('#login_password_input_noshow');
      if (verbose) {
        console.log(`passwordFieldElement`, passwordFieldElement);
      }
      if (!passwordFieldElement) {
        reject('Password field not found.');
      }

      await sleep(windowed);

      console.log(`Typing password`, debugging ? password : '*********');
      await passwordFieldElement.focus();
      await page.keyboard.type(password);

      await sleep(windowed);

      const passwordOkButton = await page.$('#ok_button');
      if (verbose) {
        console.log(`passwordOkButton`, passwordOkButton);
      }
      if (!passwordOkButton) {
        reject('Password could not be submitted.');
      }

      console.log(`Submitting password`);
      await passwordOkButton.click();

      await sleep(windowed);

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

      await sleep(windowed);

      await browser.close();
      resolve('All done 👍');
    });
  });

export default runProcess;
