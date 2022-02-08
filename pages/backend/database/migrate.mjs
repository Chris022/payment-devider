import db from './database.mjs';

db.exec("PRAGMA foreign_keys = ON;");

db.exec("DROP TABLE IF EXISTS  category;");

db.exec("CREATE TABLE 'category' ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    name varchar(100) NOT NULL \
);");

db.exec("DROP TABLE IF EXISTS  expense;");

db.exec("CREATE TABLE 'expense' ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    name varchar(100) NOT NULL, \
    by varchar(100) NOT NULL, \
    date text NOT NULL, \
    amount INTEGER NOT NULL, \
    category_id INTEGER,  \
        FOREIGN KEY (category_id) \
            REFERENCES category (id) \
            ON DELETE SET NULL \
);");