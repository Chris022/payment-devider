import db from './database.mjs';

for(var i = 1; i < 10; i++){
    db.exec("INSERT INTO category (name) VALUES ('name"+i+"');");
}

for(var i = 1; i < 9; i++){
    db.exec("INSERT INTO expense (name,by,amount,date,category_id) VALUES ('name"+i+"','0',100,datetime('now'),"+i+");");
}