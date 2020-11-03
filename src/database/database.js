const mysql = require('mysql');
const {database} = require('../lib/keys');
const {promisify} = require('util');

const pool = mysql.createPool(database);
pool.getConnection((error, connection) => {
	if(error){
		if(error.code === 'PROTOCOL_CONNECTION_LOST'){
			console.error('DATABASE CONNECTION WAS CLOSED');
		}
		if(error.code === 'ER_CON_COUNT_ERROR'){
			console.error('DATABASE HAS MANY CONNECTIONS');
		}
		if(error.code === 'ERCONNREFUSED'){
			console.error('DATABASE CONNECTION REFUSED');
		}
	}
	if(connection){
		connection.release();
		console.log('DATABASE IS CONNECTED');
		return;
	}
});

pool.query = promisify(pool.query);

module.exports = pool;
