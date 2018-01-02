#!/usr/bin/env node
const ora = require('ora');
const chalk = require('chalk');
const opn = require('opn');
const meow = require('meow');
const request = require('request');
const VERSION = meow().pkg.version;

console.log(VERSION);
