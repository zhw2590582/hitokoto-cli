import execa from 'execa';

test('Show random hitokoto', done => {
	execa('./cli.js').then(result => {
		expect(result.stdout.charAt(0)).toBe('✔');
		done();
	});
});
