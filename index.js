const querystring = require('querystring');
const ora = require('ora');
const inquirer = require('inquirer');
const opn = require('opn');
const request = require('request');
const chalk = require('chalk');
const meow = require('meow');
const homepage = meow().pkg.homepage;

const hitokotoApi = 'https://api.imjad.cn/hitokoto/?';
const config = {
  cat: '',
  charset: 'utf-8',
  length: 50,
  encode: 'json',
  fun: '',
  source: ''
};

let getHitokoto = url => {
  const spinner = ora('☕  Take a second ....  ').start();
  return request(url, (error, response, body) => {
    spinner.stop();
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      console.log(chalk.green('✔  ') + chalk.cyan(`${data.hitokoto}  ————  《${data.source}》`));
    } else {
      console.log(error);
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

let runHitokoto = options => {
  if (options.s) {
    return opn(homepage);
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

      return getHitokoto(
        hitokotoApi + querystring.stringify(Object.assign({}, config, answers))
      );
    });
  } else {
    return getHitokoto(hitokotoApi + querystring.stringify(config));
  }
};

module.exports = runHitokoto;
