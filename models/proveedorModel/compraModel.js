const pool = require('../../db');

async function createCarrito(arr,id_lote) {
    try {
        let elements = 0;
        arr.forEach(async(p)=> {
            p.id_lote = id_lote
            let query = "insert into presupuesto_has_articulo set ?";
            await pool.query(query,p);
        })
        return true;
    } catch(error) {
        throw error;
    }
}

async function createPresupuesto(obj) {
    try {
        let query = "insert into presupuesto set ?";
        const rows = await pool.query(query,obj);
        return rows;
    } catch(error) {
        throw error;
    }
}

async function getPresupuestos(id) {
    try {
        // let query = "select presupuesto.id_lote,presupuesto.descuento,presupuesto.comentario,presupuesto.estado,presupuesto.ts_created, usuario_has_datos.nombre, usuario_has_datos.apellido,usuario_has_datos.mail,usuario_has_datos.telefono" + 
        // "from presupuesto join usuarios on presupuesto.id_vendedor = usuarios.id " + 
        // "join usuario_has_datos on usuario_has_datos.id_usuario = usuarios.id " + 
        // " where id_cliente = ?";


        let query = "select presupuesto.id_lote ,presupuesto.descuento ,presupuesto.comentario ,presupuesto.estado, presupuesto.ts_created ,usuario_has_datos.nombre ,usuario_has_datos.apellido ,usuario_has_datos.mail ,usuario_has_datos.telefono from presupuesto , usuarios , usuario_has_datos where presupuesto.id_vendedor = usuarios.id and usuarios.id = usuario_has_datos.id_usuario and presupuesto.id_Cliente = ?;"


        
        
        




       const rows = await pool.query(query,id);

        // const rows = await pool.query(query);


        return rows;
    } catch(error) {
        throw error;
    }
}
async function getPresupuestoByLote(lote) {
    try{ 
        let query = "select presupuesto_has_articulo.cantidad,presupuesto_has_articulo.precio_unitario,articulo_has_data.text,articulo_has_data.pdf,articulo_has_data.imagen,articulo_has_data.precio,articulo_has_data.promo from presupuesto_has_articulo join articulo_has_data on articulo_has_data.artcode = presupuesto_has_articulo.artcode where presupuesto_has_articulo.id_lote = ?";
        const rows = await pool.query(query,lote);
        return rows;
    } catch(error) {
        throw error;
    }
}
module.exports = {getPresupuestoByLote,getPresupuestos,createPresupuesto,createCarrito}