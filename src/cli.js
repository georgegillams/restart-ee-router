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

const password = getCliArg('password', 'p');
const debugging =
  process.argv.includes('--debugging') || process.argv.includes('-d');
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

const cli = (err, { password }) => {
  console.log('Starting script');
  console.log('');

  restart(password, debugging, verbose).then(
    result => {
      if (result) {
        console.log(result);
      }
      console.log('');
      process.exit(0);
    },
    err => {
      if (err) {
        console.error(err);
      }
      console.log('');
      process.exit(1);
    },
  );
};

if (silent) {
  cli(null, { password });
} else {
  prompt.start();
  prompt.get(schema, cli);
}
