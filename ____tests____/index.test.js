const execa = require('execa');

test('Show random hitokoto', done => {
	execa('./cli.js').then(result => {
		expect(typeof result.stdout).toBe('string');
		done();
	});
});