CREATE TABLE DBTable(
	id_table int PRIMARY KEY AUTO_INCREMENT,
	table_name TEXT
);

CREATE TABLE DBLayout(
	id_layout int PRIMARY KEY AUTO_INCREMENT,
	layout_name TEXT
);

CREATE TABLE DBTab(
	id_tab int PRIMARY KEY AUTO_INCREMENT,
	sqljoins TEXT,
	xml TEXT,
	tab_type int,
	tab_name TEXT
);

CREATE TABLE DBUser(
	id_user int PRIMARY KEY AUTO_INCREMENT,
	username TEXT,
	hash TEXT,
	salt TEXT
);

CREATE TABLE DBFile(
	id_file int PRIMARY KEY AUTO_INCREMENT,
	filename TEXT,
	filetype TEXT
);

CREATE TABLE DBPermission(
	id_permission int PRIMARY KEY AUTO_INCREMENT,
	id_user int,
	id_layout int,
	grants int
);

CREATE TABLE DBColumn(
	id_column int PRIMARY KEY AUTO_INCREMENT,
	id_table int,
	column_name TEXT,
	column_type TEXT
);