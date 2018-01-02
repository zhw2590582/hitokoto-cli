const execa = require('execa');

test('Show random hitokoto', done => {
	execa('./cli.js').then(result => {
		console.log(result.stdout);
		expect(typeof result.stdout).toBe('string');
		done();
	});
});
