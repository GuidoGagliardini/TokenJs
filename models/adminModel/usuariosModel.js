const pool = require('../../db');

async function createNewUser(obj) {

    try{
        // ?? -> tablas
        // ? -> variables / objetos
        let query = "insert into ?? set ?";
        const rows = await pool.query(query,[process.env.T_USUARIOS,obj]);

        return rows;
    } catch(error) {
        throw error;
    }
}

async function addPersonalInfo(obj) {
    try {   
        let query = "insert into usuario_has_datos set ?";
        const rows = await pool.query(query,[obj]);
        return rows;
    } catch(error) {
        throw error;
    }
}

async function verifyUser(id){
    try {
        let query = "select id from usuarios where uuid = ?";
        const rows = await pool.query(query,[id]);
        return rows;
    } catch(error) {
        throw error;
    }
}

// {estado : 1}
async function updateUser(obj,id) {

    try {
        let query = "update usuarios set ? where id = ?";
        const rows = await pool.query(query,[obj,id]);
        console.log(rows);
        return rows;

    } catch(error) {
        throw error;
    }
}
async function updatePassword(id) {

    try {
        let query = "update usuarios set password = '1234' where id = ?";
        const rows = await pool.query(query, id);
        console.log(rows);
        return rows;

    } catch(error) {
        throw error;
    }
}

module.exports = {
    updateUser,
    createNewUser,
    addPersonalInfo,
    verifyUser,
    updatePassword
}