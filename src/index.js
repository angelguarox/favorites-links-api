const app = require('./server/app');
require('./database/database');

(async () => {
	await app.listen(app.get('port'), () => {
	console.log('SERVER ON PORT:', app.get('port'));
	});
})();