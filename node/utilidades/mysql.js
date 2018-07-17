var mysql = require('mysql')
var cfg = require('./cfg')
var crypto = require('./crypto')

var usuario = cfg.key.sqlUser
var pass = cfg.key.sqlPassword
var servidor = cfg.key.sqlServer
var dab = cfg.key.sqlDatabase

// CONFIGURACION -------------------------------------------------------------------------------------
var connection = mysql.createConnection({
  host: servidor,
  user: usuario,
  password: pass,
  database: dab
})
// FIN CONFIGURACION ---------------------------------------------------------------------------------

let db = {}

// CREAR / ELIMINAR TABLAS ---------------------------------------------------------------------------
db.crearTabla = function crearTabla (sTabla) {

  if (sTabla == "usuarios") {
    connection.query('CREATE TABLE IF NOT EXISTS usuarios (id INT AUTO_INCREMENT PRIMARY KEY, usuario varchar(20) UNIQUE, password varchar(80))')
    console.log('Tabla de mysql(usuarios) Creada!')
  }
  
  if (sTabla == "plantas") {
    connection.query('CREATE TABLE IF NOT EXISTS plantas (id INT AUTO_INCREMENT PRIMARY KEY, maceta INT(1) UNIQUE, planta varchar(40) UNIQUE, humedad INT(2), imagen varchar(120))') 
    console.log('Tabla de mysql(plantas) Creada!')
  }

  if (sTabla == "tipoPlanta") {
    connection.query('CREATE TABLE IF NOT EXISTS tipoPlanta (id INT AUTO_INCREMENT PRIMARY KEY, planta varchar(40) UNIQUE, humedad INT(2), imagen varchar(120))')
    console.log('Tabla de mysql(tipoPlanta) Creada!')
  }

  if (sTabla == "mail") {
    connection.query('CREATE TABLE IF NOT EXISTS mail (id INT AUTO_INCREMENT PRIMARY KEY, service varchar(40), usuario varchar(40), pass varchar(40), fromMail varchar(40), toMail varchar(120))')  
    console.log('Tabla de mysql(mail) Creada!')
  }
}

db.eliminarTabla = function eliminarTabla (sTabla) {

  if (sTabla == "usuarios") {
    connection.query('DROP TABLE usuarios')
    console.log('Tabla de mysql(usuarios) Borrada!')
  }

  if (sTabla == "plantas") {
    connection.query('DROP TABLE plantas')
    console.log('Tabla de mysql(plantas) Borrada!')
  }

  if (sTabla == "tipoPlanta") {
    connection.query('DROP TABLE tipoPlanta')
    console.log('Tabla de mysql(tipoPlanta) Borrada!')
  }

  if (sTabla == "mail") {
    connection.query('DROP TABLE mail')
    console.log('Tabla de mysql(mail) Borrada!')
  }
}
// FIN CREAR / ELIMINAR TABLAS -----------------------------------------------------------------------

// CREAR / ELIMINAR / VALIDAR USUARIO ----------------------------------------------------------------
db.crearUsuario = function crearUsuario (sUsu, sPass) {
  var passcrypt = crypto(sPass)
  database = { usuario: sUsu, password: passcrypt }

  connection.query('INSERT INTO usuarios SET ?', database, function (err, res) {
  if (err) {
    throw err
  }
  console.log('usuarios last insert id:' + res.insertId)
  console.log('--------------------')
  })
}

db.eliminarUsu = function eliminarUsu (sUsu) {
  var usuario = sUsu

  connection.query("SELECT * FROM usuarios WHERE usuario = '" + usuario +"'",
  function (err, rows) {
    var resultado = rows
    if (err) {
      console.log('error sql')
      throw err
    }else {
      if (resultado.length > 0) {
        connection.query("DELETE FROM usuarios WHERE usuario = '" + usuario +"'",
        function (err, rows) {
          var resultado = rows
          if (err) {
            console.log('error sql')
            throw err
          }else {
          console.log('Se elimina el usuario: ' + usuario + '...')
          }
        })
      }else {
      console.log('usuario ' + usuario + ' no encontrado...')
      }
    }
  })
}

db.validarUsu = function validarUsu (sUsu, sPass, callback) {
  var passcrypt = crypto(sPass)
  var usuario = sUsu

  connection.query("SELECT * FROM usuarios WHERE usuario = '" + usuario +"' AND password = '" + passcrypt + "'",
  function (err, rows) {
    var resultado = rows
    if (err) {
      console.log('error sql')
      throw err
      callback(false)
    }else {
      if (resultado.length > 0) {
        console.log('Logeado el usuario: ' + resultado[0].usuario + '...')
    callback(true)
    }else {
      console.log('FALLO de log usuario: ' + usu + '...')
    callback(false) 
  }
  }
  })
}
// FIN CREAR / ELIMINAR / VALIDAR USUARIO ------------------------------------------------------------

// CREAR / ELIMINAR / SELECT MAIL --------------------------------------------------------------------
db.crearCFGMail = function crearCFGMail (sService, sUsuario, sPass, sFromMail, sToMail) {
  
  database = { service: sService, usuario: sUsuario, pass: sPass, fromMail: sFromMail, toMail: sToMail }

  connection.query('INSERT INTO mail SET ?', database, function (err, res) {
  if (err) {
    throw err
  }
  console.log('mail last insert id:' + res.insertId)
  console.log('--------------------')
  })
}

db.eliminarCFGMail = function eliminarCFGMail (sUsu) {
  var usuario = sUsu

  connection.query("SELECT * FROM mail WHERE usuario = '" + usuario +"'",
  function (err, rows) {
    var resultado = rows
    if (err) {
      console.log('error sql')
      throw err
    }else {
      if (resultado.length > 0) {
        connection.query("DELETE FROM mail WHERE usuario = '" + usuario +"'",
        function (err, rows) {
          var resultado = rows
          if (err) {
            console.log('error sql')
            throw err
          }else {
          console.log('Se elimina el cfg de correo: ' + usuario + '...')
          }
        })
      }else {
      console.log('usuario ' + usuario + ' no encontrado...')
      }
    }
  })
}

db.selectMail = function selectMail () {

  connection.query("SELECT * FROM mail",
  function (err, rows) {
    var resultado = rows
    if (err) {
      console.log('error sql')
      throw err
    }else {
      if (resultado.length > 0) {

        var config = { 
          serviceJSON: resultado[0].service, 
          usuarioJSON: resultado[0].usuario, 
          passJSON: resultado[0].pass, 
          fromMailJSON: resultado[0].fromMail, 
          toMailJSON: resultado[0].toMail 
        }
        console.log('CFG MAIL CARGADA ' + resultado[0].usuario + '...')
        return config
      }else {
        console.log('FALLO en configuracion mail...') 
      }
    }
  })
}
// FIN CREAR / ELIMINAR / SELECT MAIL ----------------------------------------------------------------



//Puesta a punto inicial 
db.crearEstructuraDb = function crearEstructuraDb (v1, v2, v3, callback) {
  var val1 = v1
  var val2 = v2
  var val3 = v3
  
  if (val1 === cfg.key.keyVal1 && val2 === cfg.key.keyVal2 && val3 === cfg.key.keyVal3) {
    callback(true)
    } else {
    callback(false)
    }
}
module.exports = db
