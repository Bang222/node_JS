var pg_config = require('./pg_config');
async function authen1(user, pass) {
    var authenticated = false;
    const acc_query = {
        text: 'INSERT INTO account VALUES ($1,$2)',
        values: [user, pass]
    };

    var query_data = await pg_config.query(acc_query);
    if (query_data.rows.length == 1) {
        authenticated = true;
    }
    console.log(authenticated);
    return authenticated;
}
module.exports = authen1;