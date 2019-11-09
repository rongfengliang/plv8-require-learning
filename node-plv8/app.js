// setup plv8 connection
const PLV8 = require('plv8')
const knex = require('knex')
const knexHandle = knex({
    client: 'pg',
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "dalong",
      database: "postgres"
    }
  })
const plv8 = new PLV8(knexHandle)
 
// setup a log listener
plv8.on('log:error', msg => {
  console.error(msg)
})
 
// install the lodash module so that it can be loaded (via require()) later
plv8.install({modulePath:require.resolve('lodash'),moduleName:"lodash"})
  .then(() => {
 
    // eval some code
    return plv8.eval(() => {
      const _ = require('lodash')
      return _.map([ 1, 2, 3 ], e => e + 1)
    })
  })
  .then(result => {
   console.log(result)
  }).catch(err=>{
      console.log(err)
  })
  

  plv8.install({modulePath:require.resolve("shortid"),moduleName:"shortid"})
  .then(() => {
 
    // eval some code
    return plv8.eval(() => {
      const shortid = require('shortid')
      return shortid.generate()
    })
  })
  .then(result => {
   console.log(result)
  }).catch(err=>{
      console.log(err)
  })
 