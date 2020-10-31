create database favoriteslinks;

use favoriteslinks;

create table users(
	id int not null auto_increment primary key,
	username varchar(20) not null,
	password varchar(60) not null,
	fullname varchar(100) not null
);

create table links(
	id int not null auto_increment primary key,
	title varchar(150) not null,
	url varchar(255) not null,
	description text not null,
	created_at timestamp not null default current_timestamp,
	user_id int not null,
	foreign key (user_id) references users (id)
	on delete cascade on update cascade
);