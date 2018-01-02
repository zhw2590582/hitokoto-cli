#!/usr/bin/env node
const querystring = require('querystring');
const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');
const opn = require('opn');
const meow = require('meow');
const request = require('request');

const hitokotoApi = 'https://api.imjad.cn/hitokoto/?';
const config = {
	cat: '',
	charset: 'utf-8',
	length: 50,
	encode: 'json',
	fun: '',
	source: ''
};

const cli = meow(
	`
    Show random hitokoto
      $ hitokoto

    Show configurable hitokoto
      $ hitokoto -o
    
    Show current version
      $ hitokoto -v

    Source code of this side project
      $ hitokoto -s

    Show help
      $ hitokoto -h
`,
	{
		flags: {
			option: {
				type: 'boolean',
				alias: 'o'
			},
			version: {
				type: 'boolean',
				alias: 'v'
			},
			source: {
				type: 'boolean',
				alias: 's'
			},
			help: {
				type: 'boolean',
				alias: 'h'
			}
		}
	}
);

let getHitokoto = url => {
	const spinner = ora('☕  Take a second ....  ').start();
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			spinner.succeed(`${data.hitokoto}  ————  《${data.source}》`);
		} else {
			spinner.fail(error);
		}
	});
};

let questions = [
	{
		type: 'list',
		name: 'cat',
		message: 'category:',
		choices: [
			'Anime',
			'Comic',
			'Game',
			'Novel',
			'Original',
			'Internet',
			'Other'
		]
	},
	{
		type: 'list',
		name: 'charset',
		message: 'charset:',
		choices: ['gbk', 'utf-8']
	},
	{
		type: 'input',
		name: 'length',
		message: 'length:',
		validate: value => {
			const validateNumber = n =>
				!isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n && Number(n) > 0;
			if (validateNumber(value)) return true;
			return 'Please enter a valid number greater than 0';
		}
	},
	// {
	// 	type: 'list',
	// 	name: 'encode',
	// 	message: 'encode:',
	// 	choices: ['json', 'js', 'jsc', 'Plain Text']
	// },
	{
		type: 'list',
		name: 'source',
		message: 'source:',
		choices: ['Random', 'System included', 'My hitokoto']
	}
];

let run = options => {
	if (options.s) {
		opn(cli.pkg.homepage);
	} else if (options.o) {
		inquirer.prompt(questions).then(answers => {
			switch (answers.cat) {
				case 'Anime':
					answers.cat = 'a';
					break;
				case 'Comic':
					answers.cat = 'b';
					break;
				case 'Game':
					answers.cat = 'c';
					break;
				case 'Novel':
					answers.cat = 'd';
					break;
				case 'Original':
					answers.cat = 'e';
					break;
				case 'Internet':
					answers.cat = 'f';
					break;
				case 'Other':
					answers.cat = 'g';
					break;
				default:
					answers.cat = '';
					break;
			}

			if (answers.encode == 'Plain Text') {
				answers.encode = '';
			}

			switch (answers.source) {
				case 'System included':
					answers.source = '0';
					break;
				case 'My hitokoto':
					answers.source = '1';
					break;
				default:
					answers.source = '';
					break;
			}

			getHitokoto(
				hitokotoApi + querystring.stringify(Object.assign({}, config, answers))
			);
		});
	} else {
		getHitokoto(hitokotoApi + querystring.stringify(config));
	}
};

run(cli.flags);
