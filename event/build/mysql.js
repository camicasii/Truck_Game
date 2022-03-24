"use strict";
// get the client
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
function Pool() {
    // create the connection to database
    const pool = promise_1.default.createPool({
        host: 'db',
        user: 'root',
        password: 'example',
        database: 'ws_configuracion'
    });
    return pool;
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
exports.Pool = Pool;
