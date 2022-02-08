import Database from 'better-sqlite3';

const db = new Database('./database/database.db'); //{ verbose: console.log }

Object.freeze(db);
export default db;

