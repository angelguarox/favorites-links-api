module.exports = {
	database: {
		host: process.env.HOST || 'localhost',
		user: process.env.USERNAME || 'root',
		password: process.env.PASSWORD || '098098',
		database: process.env.DATABASE || 'favoriteslinks'
	},
	server: {
		port: process.env.PORT || 5000
	}
};