var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mw = require('./middlewares');
const dotenv = require('dotenv');
dotenv.config();


console.log(`Conectado a ${process.env.DB_HOST} a la base de datos : ${process.env.DB_DATABASE}`)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


// Common
const verifyRouter = require('./routes/verify');

/*Rutas admin*/ 
const adminProfile = require('./routes/admin/profile')
const adminUsuarios = require('./routes/admin/usuarios');
/*Rutas cliente*/
const proveedorCompra = require('./routes/proveedor/compra'); 


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
/*EP admin*/
app.use('/admin/profile', mw.securedAdmin, adminProfile)
app.use('/admin/usuarios',adminUsuarios); // recordar agregar el mw
/*EP Proveedor*/
app.use('/proveedor/compra', mw.securedProveedor , proveedorCompra);



/* app.use('/proveedor/compra', proveedorCompra); */

// Common
app.use('/verify', verifyRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
