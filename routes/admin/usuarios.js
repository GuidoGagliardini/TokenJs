const express = require('express');
const router = express.Router();
const generator = require('generate-password'); // incluir el modulo de generacion de pwd
const sha1 = require('sha1');
const usuariosModel = require('./../../models/adminModel/usuariosModel');
const mailer = require('./../../utils/mailer');
const uuid = require('node-uuid');
const authRecovery  = require('../../models/authModel');
const fs = require('fs');
const jwt = require('jsonwebtoken');



router.post('/', async(req,res)=> {
    try {
        let password = generator.generate({length : 10, numbers : true})
        
        // npmjs
        // ^\d+(.*)\d+$
        // password -> campo > 40 caracteres
        let uuid_route = uuid();

        const user = {
            // cuit/cuil
            usuario : req.body.nombre_usuario, // CUIT/CUIL
            password : sha1(password),
            id_region : req.body.id_region,
            permiso : req.body.permiso,
            uuid : uuid_route
        }
        const result = await usuariosModel.createNewUser(user);

        // result.insertId -> obtenemos el id de el insert (primary_key)
        const user_info = {
            id_usuario : result.insertId,
            nombre : req.body.nombre,
            apellido : req.body.apellido,
            documento : req.body.documento,
            direccion : req.body.direccion,
            telefono : req.body.telefono,
            mail : req.body.mail
        }
        let resultDetails = await usuariosModel.addPersonalInfo(user_info);
        // URL_SERVER : http://localhost:3000
        let html = `
            <html>
                <body>
                    <h4>Usuario : ${user.usuario}</h4>
                    <h4>Pasword : ${password}</h4>
                    <a href="${process.env.URL_SERVER}/verify/${uuid_route}">Link de activación</a>
                    <h1>GRACIAS POR SU LEALTAD</h1>
                    
                </body>
            </html>
        `

        // localhost:3000/verify/uuid

        let mail = await mailer.sendRegisterInfo(user_info.mail,html)


        res.json({message : 'Usuario creado exitosamente', id : mail})

    } catch(error) {
        console.log(error);
        res.sendStatus(500); // envia un 500 al cliente
    }
})
router.post('/recovery', async(req,res)=> {
    
    console.log('acaacacacacacacaacacacacaaccaca');
    
    try {

        let user = {
            usuario : req.body.user,
            mail: req.body.mail
        
        
        }
       

        
        console.log(req.body);

        

        let result = await authRecovery.authUserRecovery(user.usuario);
        
        
        let signOptions = {
            expiresIn : "1h",
            algorithm : "RS256"
        }
        if(result.length > 0) {
            const privateKey = fs.readFileSync('./keys/private.pem','utf-8');

            let payload = {
                id : result[0].id, // id del usuario
                id_permiso : result[0].permiso // id permiso
            }
            console.log(`Payload a enviar `);
            console.log(payload);
            let usuario = {user : result[0].usuario};
            // console.log(result[0].usuario);
            // console.log(signOptions);
            // console.log(privateKey);
            const token = jwt.sign(payload,privateKey,signOptions);
            res.json({usuario, message:'USUARIO ENCONTRADO SE ENVIARA MAIL'}); 

            const publicKey = fs.readFileSync('./keys/public.pem');
            let decoded = jwt.verify(token, publicKey);
            console.log('abajo de esto decoded');
            console.log(decoded);

            req.id = decoded.id;
            req.id_permiso = decoded.id_permiso;



            //Mail con link y token 
            let html = `
                <html>
                    <body>
                        <h4>Usuario :${user.usuario}</h4>
                        <h4> PARA RECUPERAR EL PASSWORD HAGA CLICK EN EL SIGUIENTE LINK 
                        <a href="${process.env.URL_SERVER}/recovery/${token}/">Link de activación</a>
                        
                        </h4>
    
                       
                        <h1>Recuprar password</h1>
                        
                    </body>
                    </html>
                    `
                    console.log('este es el usuario');
                    console.log(user);
                    
                    let mail = await mailer.RecoveryUserInfo(user.mail,html);

            
            
          
        } else {
            res.status(401).json({message : 'unauthorized'})
        }

        
      
        

        // localhost:3000/recovery/token


        // res.json({message : 'Contraseña enviada!!!!!', id : mail})

    } catch(error) {
        console.log(error);
        res.sendStatus(500); // envia un 500 al cliente
    }
})



module.exports = router;