const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');
const chalk = require('chalk');

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
	if(err){
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			console.error(`${chalk.red('DATABASE CONNECTION WAS CLOSED')}`);
		}
		if(err.code === 'ER_CON_COUNT_ERROR'){
			console.error(`${chalk.red('DATABASE HAS MANY CONNECTIONS')}`);
		}
		if(err.code === 'ERCONNREFUSED'){
			console.error(`${chalk.red('DATABASE CONNECTION REFUSED')}`);
		}
	}
	if(connection){
		connection.release();
		console.log(`${chalk.white('DATABASE IS CONNECTED')}`);
		return;
	}
});

pool.query = promisify(pool.query);

module.exports = pool;