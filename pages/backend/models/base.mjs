import db from '../database/database.mjs'


function all(table,columns){
    return () => {
        const stmt = db.prepare("SELECT id," + columns.join(',') + " FROM " + table);
        return stmt.all();
    }
}

function insert(table,columns){
    return (data) => {
        let sets = columns.map(key => "@"+key)
        const stmt = db.prepare("INSERT INTO " + table + " (" + columns.join(',') + ") VALUES (" + sets + ")");
        return stmt.run(data);
    }
}

function find(table,columns){
    return (id) => {
        const stmt = db.prepare("SELECT id," + columns.join(',') + " FROM " + table + " WHERE id=?");
        return stmt.get(id);
    }
}

function update(table,columns){
    return (id,data) => {
        let sets = Object.keys(data).map(key => key + " = @"+key)
        const stmt = db.prepare( "UPDATE " + table + " SET " + sets + " WHERE id=?");
        stmt.run(id,data);
    }
}

function delete_(table,columns){
    return (id) => {
        const stmt = db.prepare("DELETE FROM " + table + " WHERE id=?");
        stmt.run(id);
    }
}

function deleteAll(table,columns){
    return () => {
        const stmt = db.prepare("DELETE FROM " + table );
        stmt.run();
    }
}

function filter(table,columns){
    return (filter,value) => {
        let evalFilter = filter(value);
        let stmt = db.prepare("SELECT id," + columns.join(',') + " FROM " + table + " where " + evalFilter["where"]);
        return stmt.all(evalFilter["data"]);
    }
}

export function generateModel(table,columns){

    return {
           all : all(table,columns),
           deleteAll : deleteAll(table,columns),
           insert : insert(table,columns),
           find : find(table,columns),
           update : update(table,columns),
           delete: delete_(table,columns),
           filter: filter(table,columns)
    };
}