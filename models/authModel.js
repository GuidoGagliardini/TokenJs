const pool = require('../db');

async function authUser(user,password){
    try {
        let query = "select id, usuario, id_region, permiso from usuarios where usuario = ? and password = ?";
        const rows = await pool.query(query,[user,password]);
        return rows;
    } catch (error) {
        // start transaction | rollback   
        throw error; // pasar el error al padre
    }
}
async function authUserRecovery(user){
    try {
        let query = "select id, usuario, id_region, permiso from usuarios where usuario = ?";
        const rows = await pool.query(query,user);
        return rows;
    } catch (error) {
        // start transaction | rollback   
        throw error; // pasar el error al padre
    }
}
module.exports = {authUser, authUserRecovery }