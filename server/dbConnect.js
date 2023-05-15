const { Database, aql } = require('arangojs');

const db = new Database();
db.useDatabase('your_database');
db.useBasicAuth('username', 'password');
