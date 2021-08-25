const Pool = require('pg').Pool;
const pg_conn = new Pool({
    user: 'mhipvookyrtaut',
    host: 'ec2-35-168-145-180.compute-1.amazonaws.com',
    database: 'd1nu2cneclu7qb',
    password: 'd02524069d1655c1c81097cd2171450db84c35d4b6e7df91bf838656926844e2',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
});
module.exports = pg_conn;