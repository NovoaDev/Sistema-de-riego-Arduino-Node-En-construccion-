const mysql = require('mysql')
const cfg = require('./cfg')
const crypto = require('./crypto')
const emailModel = require('../modelos/emailModel')
const mail = new emailModel()
const tipoPlantaModel = require('../modelos/tipoPlantaModel')
const tPlanta = new tipoPlantaModel()

let usuario = cfg.key.sqlUser
let pass = cfg.key.sqlPassword
let servidor = cfg.key.sqlServer
let dab = cfg.key.sqlDatabase

// CONFIGURACION -------------------------------------------------------------------------------------
let connection = mysql.createConnection({
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
    connection.query('CREATE TABLE IF NOT EXISTS plantas (id INT AUTO_INCREMENT PRIMARY KEY, maceta INT(1) UNIQUE, planta varchar(40), humedad INT(2), notas varchar(120), imagen varchar(120))') 
    console.log('Tabla de mysql(plantas) Creada!')
  }

  if (sTabla == "tipoPlanta") {
    connection.query('CREATE TABLE IF NOT EXISTS tipoPlanta (id INT AUTO_INCREMENT PRIMARY KEY, planta varchar(40) UNIQUE, humedad INT(2), notas varchar(120), imagen varchar(120))')
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

// CREAR / ELIMINAR / VALIDAR / ACTUALIZAR USUARIO ----------------------------------------------------------------
db.crearUsuario = function crearUsuario (sUsu, sPass) {
  let passcrypt = crypto(sPass)
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
  let usuario = sUsu

  connection.query("SELECT * FROM usuarios WHERE usuario = '" + usuario +"'",
  function (err, rows) {
    let resultado = rows
    if (err) {
      console.log('error sql')
      throw err
    }else {
      if (resultado.length > 0) {
        connection.query("DELETE FROM usuarios WHERE usuario = '" + usuario +"'",
        function (err, rows) {
          let resultado = rows
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
  let passcrypt = crypto(sPass)
  let usuario = sUsu

  connection.query("SELECT * FROM usuarios WHERE usuario = '" + usuario +"' AND password = '" + passcrypt + "'",
  function (err, rows) {
    let resultado = rows
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

db.updateUsuario = function updateUsuario (sUsu, sPass) {

  connection.query("UPDATE usuarios SET usuario= '"+sUsu+"', pass= '"+sPass+"', pass= '"+sNuevaPass+"' WHERE id LIKE 1",
  function (err, res) {
    if (err) {
      console.log('error sql')
      throw err
    }else {
      console.log('Configuracion de usuario actualizada')
    }
  })
}
// FIN CREAR / ELIMINAR / VALIDAR / ACTUALIZAR USUARIO ------------------------------------------------------------

// CREAR / ELIMINAR / SELECIONAR / ACTUALIZAR MAIL --------------------------------------------------------------------
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

db.eliminarCFGMail = function eliminarCFGMail () {

  connection.query("DELETE * FROM mail",
  function (err, res) {
    if (err) {
      console.log('error sql')
      throw err
    }else {
    console.log('Se elimina el cfg de correo: ' + usuario + '...')
    }
  })
}

db.selectMail = function selectMail (callback) {

  connection.query("SELECT * FROM mail",
  function (err, rows) {
    let resultado = rows
    if (err) {
      console.log('error sql')
      callback("error")
      throw err
    }else {
      if (resultado.length > 0) {
        mail.setService(resultado[0].service)     
        mail.setUsuario(resultado[0].usuario)
        mail.setPass(resultado[0].pass)
        mail.setFromMail(resultado[0].fromMail)
        mail.setToMail(resultado[0].toMail)

        callback(mail)
        console.log('CFG MAIL CARGADA ' + resultado[0].usuario + '...')
      }else {
        callback("vacia")
        console.log('tabla vacia mail...') 
      }
    }
  })
}

db.updateMail = function updateMail (sService, sUsuario, sNuevaPass, sNuevaFromMail, sNuevaToMail) {

  connection.query("UPDATE mail SET service= '"+sService+"', usuario= '"+sUsuario+"', pass= '"+sNuevaPass+"', fromMail= '"+sNuevaFromMail+"', toMail= '"+sNuevaToMail+"' WHERE id LIKE 1",
  function (err, res) {
    if (err) {
      console.log('error sql')
      throw err
    }else {
      console.log('Configuracion de correo actualizada')
    }
  })
}
// FIN CREAR / ELIMINAR / SELECT / ACTUALIZAR MAIL ----------------------------------------------------------------

// CREAR / ELIMINAR / TIPOPLANTA / ACTUALIZAR ------------------------------------------------------------------
db.crearTipoPlanta = function crearTipoPlanta (sPlanta, iHumedad, sNotas, sImagen) {
  
  database = { planta: sPlanta, humedad: iHumedad, notas: sNotas, imagen: sImagen }

  connection.query('INSERT INTO tipoPlanta SET ?', database, function (err, res) {
  if (err) {
    throw err
  }
  console.log('tipoPlanta last insert id:' + res.insertId)
  console.log('--------------------')
  })
}

db.eliminarTipoPlanta = function eliminarTipoPlanta (sPlanta) {
  let planta = sPlanta

  connection.query("SELECT * FROM tipoPlanta WHERE planta = '" + planta +"'",
  function (err, rows) {
    let resultado = rows
    if (err) {
      console.log('error sql')
      throw err
    }else {
      if (resultado.length > 0) {
        connection.query("DELETE FROM tipoPlanta WHERE planta = '" + planta +"'",
        function (err, rows) {
          let resultado = rows
          if (err) {
            console.log('error sql')
            throw err
          }else {
          console.log('Se elimina la planta: ' + planta + '...')
          }
        })
      }else {
      console.log('planta ' + planta + ' no encontrada...')
      }
    }
  })
}

db.selectTipoPlanta = function selectTipoPlanta (sTipo, callback) {

  if ((sTipo != "") && (sTipo != undefined)) {
    connection.query("SELECT * FROM tipoplanta WHERE planta = '" + sTipo +"'",
    function (err, rows) {
      let resultado = rows
      if (err) {
        console.log('error sql')
        callback("error")
        throw err
      }else {
        if (resultado.length > 0) {

          tPlanta.setPlanta(resultado[0].planta, 0)
          tPlanta.setHumedad(resultado[0].humedad, 0)
          tPlanta.setNotas(resultado[0].notas, 0)
          tPlanta.setImagen(resultado[0].imagen, 0)

          callback(tPlanta)
          console.log('Tabla tipoPlanta planta ' + resultado[0].planta + ' CARGADA')
        }else {
            callback("vacia")
          console.log('tabla tipoPlanta vacia...')
        }
      }
    })
  } else {
    connection.query("SELECT * FROM tipoPlanta",
    function (err, rows) {
      let resultado = rows
      if (err) {
        console.log('error sql')
        callback("error")
        throw err
      }else {
        if (resultado.length > 0) {
          let iIte, iIteFinal

          iIteFinal = resultado.length
          for (iIte = 0; iIte < iIteFinal; iIte++) {
            tPlanta.setPlanta(resultado[iIte].planta, iIte)
            tPlanta.setHumedad(resultado[iIte].humedad, iIte)
            tPlanta.setNotas(resultado[iIte].notas, iIte)
            tPlanta.setImagen(resultado[iIte].imagen, iIte)
          }

          callback(tPlanta)
          console.log('Tabla tipoPlanta CARGADA ' + iIteFinal + ' registros...')
        }else {
            callback("vacia")
          console.log('tabla tipoPlanta vacia...')
        }
      }
    })
  }
}

// FIN CREAR / ELIMINAR TIPOPLANTA -----------------------------------------------------------------

// CREAR / ELIMINAR / ACTUALIZAR PLANTAS ----------------------------------------------------------------------
db.crearPlantas = function crearPlantas (iMaceta, sPlanta, iHumedad, sNotas, sImagen) {
  
  database = { maceta: iMaceta, planta: sPlanta, humedad: iHumedad, notas: sNotas, imagen: sImagen }

  connection.query('INSERT INTO plantas SET ?', database, function (err, res) {
  if (err) {
    throw err
  }
  console.log('plantas last insert id:' + res.insertId)
  console.log('--------------------')
  })
}

db.updatePlantas = function updatePlantas (iMaceta, sNuevaPlanta, iNuevaHumedad, sNuevaNotas, sNuevaImagen) {

  connection.query("UPDATE plantas SET planta= '"+sNuevaPlanta+"', humedad= '"+iNuevaHumedad+"', notas= '"+sNuevaNotas+"', imagen= '"+sNuevaImagen+"' WHERE maceta LIKE '"+ iMaceta +"'",
  function (err, res) {
    if (err) {
      console.log('error sql')
      throw err
    }else {
      console.log('Actualizada la maceta nº ' + iMaceta + '...')
    }
  })
}
// FIN CREAR / ELIMINAR / ACTUALIZAR PLANTAS ------------------------------------------------------------------

//Puesta a punto inicial 
db.crearEstructuraDb = function crearEstructuraDb (v1, v2, v3, callback) {
  let val1 = v1
  let val2 = v2
  let val3 = v3
  
  if (val1 === cfg.key.keyVal1 && val2 === cfg.key.keyVal2 && val3 === cfg.key.keyVal3) {
    callback(true)
    } else {
    callback(false)
    }
}
module.exports = db
