const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'dalong',
    database: 'postgres'
  }
});

/**
 *  
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
for (let index = 0; index < 50000; index++) {
  knex.raw(`SET plv8.start_proc = 'v8.plv8_init';`).then(() => {
    const results2 = knex.select(knex.raw(`
    dalong4();`))
    results2.map(columes => {
      console.log(columes)
    }).catch(err => {
      console.log(err)
    })
  }
  )
}