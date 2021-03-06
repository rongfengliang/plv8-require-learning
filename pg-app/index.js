const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'dalong',
    database: 'postgres'
  },
  // use connect pool for more connects default max is  7
  pool: { min: 0, max: 80 }
});

/**
 *   you can use ALTER DATABASE postgres SET "plv8.start_proc" TO "v8.plv8_init"; for db session config
 * dalong4  function  test
 * shorid module with 
 *  
CREATE or replace FUNCTION dalong4() RETURNS json AS
$$
   const shortid = require('shortid');
   const result =  shortid.generate();
   return JSON.stringify(result);
$$
LANGUAGE plv8;
 * 
 */

// test 1000000 for get shortid

function querytest() {
  for (let index = 0; index < 100000; index++) {
    const results2 = knex.select(knex.raw(`
      dalong4();`))
    results2.map(columes => {
      console.log(columes)
    }).catch(err => {
      console.log(err)
    })
  }
}


function insertshortid() {
  for (let index = 0; index < 50000; index++) {
    let result = knex.raw("insert into shortids(shortid) values(shortid());");
    result.then(data=>{
      console.log(data)
    }).catch(err=>{
      console.log(err)
    })
  }
}

insertshortid()