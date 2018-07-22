const http = require('http')
const express = require('express')
const SocketIO = require('socket.io')
const SerialPort = require('serialport')
const bParser = require('body-parser')
const mailer = require('./utilidades/mailer')
const datab = require('./utilidades/mysql')
const val = require('./utilidades/validarValoresSensores')
const arduinoModel = require('./modelos/arduinoModel')

const app = express()
const server = http.createServer(app)
const io = SocketIO.listen(server)
const ReadLine = SerialPort.parsers.Readline

const sis = new arduinoModel()
//let mail = new mailer("99")

app.use(express.static(__dirname + '/public'))
app.use(bParser.urlencoded({extended: true}))

const port = new SerialPort("COM3", { baudRate: 9600 })
const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }))

app.get('/log', function (req, res) {
  res.sendfile('public/login.html')
})

app.post('/entrar', function (req, res) {
  let usu = req.body.usuario
  let pass = req.body.password
  let login = false
  
  console.log(usu)
  console.log(pass)
  datab.validarUsu(usu, pass, function (vali) {
    if (vali) {
      res.send('Bienvenido ')
      let login = true
	  
    } else {
      res.send('Usuario o clave incorrecta ')
      let login = false
    }
  })
})

app.get('/crear', function (req, res) {
  res.send('creando tablas')
  
  //ELIMINAR TABLAS
  //datab.eliminarTabla("usuarios")
  //datab.eliminarTabla("plantas")
  //datab.eliminarTabla("tipoPlanta")
  //datab.eliminarTabla("mail")
  //datab.eliminarTabla("registro")

  //CREAR TABLAS
  //datab.crearTabla("usuarios")
  //datab.crearTabla("plantas")
  //datab.crearTabla("tipoPlanta")
  //datab.crearTabla("mail")
  datab.crearTabla("registro")

  //datab.crearUsuario("lola", "rica")
  //datab.crearUsuario("lola2", "rica")
  //datab.eliminarUsu("lola2")
  //datab.crearCFGMail("1", "1", "1", "1", "1")
  //datab.eliminarCFGMail("1")

  /*
  //inicio test arry dentro de objeto tipoPlanta
  datab.crearTipoPlanta("coco", 20, "planta de coco cuidar con la vida", "C:/coso")
  datab.crearTipoPlanta("coco1", 21, "planta de coco cuidar con la vida1", "C:/coso")
  datab.crearTipoPlanta("coco2", 22, "planta de coco cuidar con la vida2", "C:/coso")
  datab.crearTipoPlanta("coco3", 23, "planta de coco cuidar con la vida3", "C:/coso")
  datab.crearTipoPlanta("coco4", 24, "planta de coco cuidar con la vida4", "C:/coso")
  datab.crearTipoPlanta("coco5", 25, "planta de coco cuidar con la vida5", "C:/coso")
  datab.crearTipoPlanta("coco6", 26, "planta de coco cuidar con la vida6", "C:/coso")
  datab.crearTipoPlanta("coco7", 27, "planta de coco cuidar con la vida7", "C:/coso")
  datab.crearTipoPlanta("coco8", 28, "planta de coco cuidar con la vida8", "C:/coso")
  datab.crearTipoPlanta("coco9", 29, "planta de coco cuidar con la vida9", "C:/coso")
  datab.crearTipoPlanta("coco10", 30, "planta de coco cuidar con la vida10", "C:/coso")
  datab.crearTipoPlanta("coco11", 31, "planta de coco cuidar con la vida11", "C:/coso")
  //FIN test arry dentro de objeto tipoPlanta 
  */

  
  //crear tabla planta generico
  //datab.crearPlantas(1, "tomate", 21, "tomate generico", "C:/coso")
  //datab.crearPlantas(2, "calabaza", 22, "calabaza generica", "C:/coso")
  //datab.crearPlantas(3, "pepino", 23, "pepino generico", "C:/coso")
  //FIN crear tabla planta generico
  
  //Upadate plantas 
  //datab.updatePlantas(3, "ponpon", 90, "pon pon generico", "C:/cososss")
  
  //datab.updateMail("ponpon", "papa@gmail.com", "pass", "C:/ff", "C:/tt")


 //datab.updateMail("ponpon", "papa@gmail.com", "pass", "C:/ff", "C:/tt")
  //let lola = datab.selectTipoPlanta("")
  //let cfgCorreo = datab.selectMail()
  //console.log(lola)

})

app.get('/tipo', function (req, res) {
  
  let sTipoPlanta ="coco5"
  datab.selectTipoPlanta("coco5", function (oTipoPlanta) {
    if ((oTipoPlanta != "vacia") && (oTipoPlanta != "error")) {
      res.send(oTipoPlanta)
    }
  })
})

parser.on('open', function () {
  	console.log('connection is opened')
})

parser.on('data', function (data) {
  	selectorDeVar(data.toString())

  	io.emit('selec0', sis.nivelAguaValor)
  	io.emit('selec1', sis.claridadValor)
  	io.emit('selec2', sis.nivelAgua)
  	io.emit('selec3', sis.claridad)
  	io.emit('selec4', sis.humedadPlanta1)
  	io.emit('selec5', sis.humedadPlanta2)
  	io.emit('selec6', sis.humedadPlanta3)
  	io.emit('selec7', sis.humedadAmbiente)
  	io.emit('selec8', sis.tempAmbiente)
  	//let mail = new mailer("1")
})

app.get('/cfg', function (req, res) {
  res.send('Puesta a punto inicial')
  
  //CAMBIAR USUARIO
  
  //CREAR USUARIO GENERICO
  datab.crearUsuario("admin", "admin")

  //CREAR TIPOPLANTA GENERICO
  datab.crearTipoPlanta("generica", 70, "Planta generica 70% humedad", "C:/coso")

  //CREAR PLANTAS GENERICAS
  datab.crearPlantas(1, "generica", 70, "Planta generica 70% humedad", "C:/coso")
  datab.crearPlantas(2, "generica", 70, "Planta generica 70% humedad", "C:/coso")
  datab.crearPlantas(3, "generica", 70, "Planta generica 70% humedad", "C:/coso")
})


app.get('/puestaAPuntoInicial', function (req, res) {
  res.send('Puesta a punto inicial')
  
  //CREAR TABLAS
  datab.crearTabla("usuarios")
  datab.crearTabla("plantas")
  datab.crearTabla("tipoPlanta")
  datab.crearTabla("mail")

  //CREAR USUARIO GENERICO
  datab.crearUsuario("admin", "admin")

  //CREAR TIPOPLANTA GENERICO
  datab.crearTipoPlanta("generica", 70, "Planta generica 70% humedad", "C:/coso")

  //CREAR PLANTAS GENERICAS
  datab.crearPlantas(1, "generica", 70, "Planta generica 70% humedad", "C:/coso")
  datab.crearPlantas(2, "generica", 70, "Planta generica 70% humedad", "C:/coso")
  datab.crearPlantas(3, "generica", 70, "Planta generica 70% humedad", "C:/coso")
})

function selectorDeVar (sDatosArduino) {
    let sDatos = sDatosArduino
    let sDatosPrefijo = sDatos.substring(0, 3)
    let iLargoDatos = sDatos.length
    let sDatosFinal = sDatos.substring(3, iLargoDatos)
    let sRetornoFunciones

    if (sDatosPrefijo == "#0#") { 
    	sRetornoFunciones = val.validarNivelAgua(sDatosFinal) 
    	sis.setNiveAguaValor(sDatosFinal)
    	sis.setNiveAgua(sRetornoFunciones)
    }
    if (sDatosPrefijo == "#1#") { 
		  sRetornoFunciones = val.validarClaridad(sDatosFinal) 
		  sis.setClaridadValor(sDatosFinal)
    	sis.setClaridad(sRetornoFunciones) 
    }
    
    if (sDatosPrefijo == "#2#") { sis.setHumedadPlanta1(sDatosFinal+" %") }
    if (sDatosPrefijo == "#3#") { sis.setHumedadPlanta2(sDatosFinal+" %") }
    if (sDatosPrefijo == "#4#") { sis.setHumedadPlanta3(sDatosFinal+" %") }
    if (sDatosPrefijo == "#5#") { sis.setHumedadAmbiente(sDatosFinal+" %") }
    if (sDatosPrefijo == "#6#") { sis.setTempAmbiente(sDatosFinal) }	
}

server.listen(3000, () => console.log('server on port 3000'))



