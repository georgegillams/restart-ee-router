#!/usr/bin/env node

const restart = require('./restart.js');
const prompt = require('prompt');

const getCliArg = (argFlag, argFlagShort) => {
  if (process.argv.includes(`--${argFlag}`)) {
    return process.argv[process.argv.indexOf(`--${argFlag}`) + 1];
  }
  if (process.argv.includes(`-${argFlagShort}`)) {
    return process.argv[process.argv.indexOf(`-${argFlagShort}`) + 1];
  }
  return null;
};

const passwordArg = getCliArg('password', 'p');
const executablePathArg = getCliArg('executablePath', 'ep');
const debugging =
  process.argv.includes('--debugging') || process.argv.includes('-d');
const windowed =
  process.argv.includes('--windowed') || process.argv.includes('-w');
const verbose =
  process.argv.includes('--verbose') || process.argv.includes('-v');
const silent = process.argv.includes('--silent') || process.argv.includes('-s');

module.exports = cli;

const schema = {
  properties: {
    password: {
      description: 'What is the admin password?',
    },
  },
};

const cli = (err, { password, executablePath }) => {
  console.log('Starting script');
  console.log('');

  restart(password, debugging, windowed, verbose, executablePath).then(
    result => {
      if (result) {
        console.log(result);
      }
      console.log('');
      process.exit(0);
    },
    error => {
      if (error) {
        console.error(error);
      }
      console.log('');
      process.exit(1);
    },
  );
};

if (silent) {
  cli(null, { password: passwordArg, executablePath: executablePathArg });
} else {
  prompt.start();
  prompt.get(schema, cli);
}
