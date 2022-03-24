// get the client

import mysql from 'mysql2/promise'

export function Pool():mysql.Pool {
    // create the connection to database
const pool =  mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'example',
    database: 'ws_configuracion'
  });
  
return pool
  
  
  // simple query
//   const [results, fields]=  await pool.execute('SELECT cantidad_ttf FROM ws_saldo_usuario'
  //   function(err, results, fields) {
  //     console.log(results); // results contains rows returned by server
  //     console.log(fields); // fields contains extra meta data about results, if available
  //   }
//   );
//   console.log(results);
  
  // // with placeholder
  // connection.query(
  //   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  //   ['Page', 45],
  //   function(err, results) {
  //     console.log(results);
  //   }
  // );
    
}