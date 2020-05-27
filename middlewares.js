const jwt = require('jsonwebtoken');
const fs = require('fs');
securedAdmin = (req,res,next) => {
    try {
      console.log("Entra al mw securedAdmin")
      let token = req.headers.authorization;
      console.log(token) 
      token = token.replace('Bearer ','');
      const publicKey = fs.readFileSync('./keys/public.pem');
      let decoded = jwt.verify(token, publicKey);
      console.log(`Decoded :`);
      console.log(decoded)
      req.id = decoded.id;
      req.id_permiso = decoded.id_permiso;
  
      req.id_permiso == 1 ? next() : res.status(401).json({message : 'unauthorized'})
    } catch (error) {
      res.status(401).json({message: 'unauthorized'});
    }
}
  
securedManager = (req,res,next) => {
try {
    let token = req.headers.authorization; 
    token = token.replace('Bearer ','');
    const publicKey = fs.readFileSync('./keys/public.pem');
    let decoded = jwt.verify(token, publicKey);
    
    req.id = decoded.id;
    req.id_permiso = decoded.id_permiso;

    req.id_permiso == 2 ? next() : res.status(401).json({message : 'unauthorized'})
} catch (error) {
    res.status(401).json({message: 'unauthorized'});
}
}

securedVendedor = (req,res,next) => {
try {
    let token = req.headers.authorization; 
    token = token.replace('Bearer ','');
    const publicKey = fs.readFileSync('./keys/public.pem');
    let decoded = jwt.verify(token, publicKey);
    
    req.id = decoded.id;
    req.id_permiso = decoded.id_permiso;

    req.id_permiso == 3 ? next() : res.status(401).json({message : 'unauthorized'})
} catch (error) {
    res.status(401).json({message: 'unauthorized'});
}
}

securedProveedor = (req,res,next) => {
    try {
        let token = req.headers.authorization; 
        token = token.replace('Bearer ','');
        const publicKey = fs.readFileSync('./keys/public.pem');
        let decoded = jwt.verify(token, publicKey);
        
        // decoded contiene el payload generado por el JWT
        // decoded : {id : 4, id_permiso :5}
        req.id= decoded.id; // 4
        req.id_permiso = decoded.id_permiso; // req : {id_permiso : 5}

        req.id_permiso == 5 ? next() : res.status(401).json({message : 'unauthorized'})
    } catch (error) {
        res.status(401).json({message: 'unauthorized'});
    }
}

module.exports = {securedAdmin,securedManager,securedVendedor, securedProveedor}