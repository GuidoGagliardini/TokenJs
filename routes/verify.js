const express = require('express');
const router = express.Router();
// localhost:3000/verify/asndasd-1293jasd-asdn9asdsad
const usuariosModel = require('./../models/adminModel/usuariosModel');
router.get('/:id',async (req,res)=> {
    try {
        console.log(`UUID URL :${req.params.id}`)
        let result = await usuariosModel.verifyUser(req.params.id);
        // result.length > 0 -> actualizamos ; no actualizamos
        // if activado == 1 -> esta pagina no está disponible

        result.length > 0 ?
        usuariosModel.updateUser(
            {activado : 1},
            result[0].id) :
        console.log("Error de activacion")

        res.send();
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = router;
