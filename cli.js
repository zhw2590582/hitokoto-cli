#!/usr/bin/env node
const meow = require('meow');
const runHitokoto = require('.');

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

runHitokoto(cli.flags);
