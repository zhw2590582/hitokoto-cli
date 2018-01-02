const execa = require('execa');

test('Show random hitokoto', done => {
	execa('./cli.js').then(result => {
		console.log(result.stdout);
		expect(result.stdout.charAt(0)).toBe('✔');
		done();
	});
});
