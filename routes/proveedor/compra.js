const express = require('express');
const router = express.Router();
const compraModel = require('./../../models/proveedorModel/compraModel');
const uuid = require('node-uuid');


// Estos son todos los productos de un cliente
router.get('/all/:id', async(req,res,next)=> {


    try {
        console.log(req.params.id);
        let result = await compraModel.getPresupuestos(req.params.id);

        res.json({resultado : result})


        // res.json({"presupuestos" : result})
    } catch(error) {
        console.log(error);
        res.statusCode(500)
    }
})

router.get('/:lote', async(req,res,next)=> {
    try {
        let result = await compraModel.getPresupuestoByLote(req.params.lote);
        res.json({presupuesto : result})
    } catch(error) {
        res.statusCode(500)
    }
})




router.post('/', async(req,res,next)=> {
    try {
        console.log(req.body)
        let id_lote = uuid(); // generacion de id_lote
        let objectPresupuesto = {}
        let objectPresupuesto_h_Articulo = [];
        Object.assign(objectPresupuesto,{id_lote : id_lote});
        Object.assign(objectPresupuesto,{id_vendedor : req.body.id_vendedor});
        Object.assign(objectPresupuesto,{id_cliente : req.id});
        Object.assign(objectPresupuesto,{comentario : req.body.comentario});
        objectPresupuesto_h_Articulo = req.body.articulos
        compraModel.createPresupuesto(objectPresupuesto)
        let result = compraModel.createCarrito(objectPresupuesto_h_Articulo,id_lote)
        res.json({insertedRows : result})
 
    } catch(error) {
        console.log(error);
        res.statusCode(500);
    }
})


module.exports = router;
