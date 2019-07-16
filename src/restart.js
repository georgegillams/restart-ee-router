#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');

const ROUTER_ADDRESS = 'http://192.168.1.254/';

const normaliseText = text => {
  let result = text.replace(/\r\n|\r/g, '\n');
  result = result.replace(/\ +/g, ' ');
  return result;
};

const getElementWithInnerText = async (page, elementType, linkString) => {
  const elements = await page.$$(elementType);
  for (var i = 0; i < elements.length; i++) {
    let valueHandle = await elements[i].getProperty('innerText');
    let linkText = await valueHandle.jsonValue();
    const text = getText(linkText);
    if (normaliseText(text).includes(normaliseText(linkString))) {
      return elements[i];
    }
  }
  return null;
};

const getElementWithValue = async (page, elementType, linkString) => {
  const elements = await page.$$(elementType);
  for (var i = 0; i < elements.length; i++) {
    let valueHandle = await elements[i].getProperty('value');
    let linkText = await valueHandle.jsonValue();
    const text = getText(linkText);
    if (normaliseText(text).includes(normaliseText(linkString))) {
      return elements[i];
    }
  }
  return null;
};

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

const sleep = async debugging => {
  if (debugging) {
    await delay(5000);
  } else {
    await delay(5000);
  }
};

const runProcess = (password, debugging, verbose) =>
  new Promise((resolve, reject) => {
    console.log(`Accessing router`);

    puppeteer.launch({ headless: !debugging }).then(async browser => {
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
      const restartPos = await restartButtonElement.boundingBox();

      if (verbose) {
        console.log(`restartPos`, restartPos);
      }

      const clickPos = { x: restartPos.x + 10, y: restartPos.y + 10 };
      await page.mouse.move(clickPos.x, clickPos.y);
      await sleep(debugging);
      await page.mouse.click(clickPos.x, clickPos.y);

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
