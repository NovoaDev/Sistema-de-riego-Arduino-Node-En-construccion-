const http = require('http')
const express = require('express')
const SocketIO = require('socket.io')
const SerialPort = require('serialport')
var bParser = require('body-parser')
var arduinoModel = require('./modelos/arduinoModel')
var mailer = require('./utilidades/mailer')
var datab = require('./utilidades/mysql')

const app = express()
const server = http.createServer(app)
const io = SocketIO.listen(server)
const ReadLine = SerialPort.parsers.Readline

var sis = new arduinoModel()
//var mail = new mailer("99")

app.use(express.static(__dirname + '/public'))
app.use(bParser.urlencoded({extended: true}))

const port = new SerialPort("COM3", { baudRate: 9600 })
const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }))

app.get('/log', function (req, res) {
  res.sendfile('public/login.html')
})

app.post('/entrar', function (req, res) {
  var usu = req.body.usuario
  var pass = req.body.password
  var login = false
  
  console.log(usu)
  console.log(pass)
  datab.validarUsu(usu, pass, function (vali) {
    if (vali) {
      res.send('Bienvenido ')
      var login = true
	  
    } else {
      res.send('Usuario o clave incorrecta ')
      var login = false
    }
  })
})

app.get('/crear', function (req, res) {
  res.send('creando tablas')
  //datab.crearTabla("usuarios")
  //datab.crearTabla("plantas")
  //datab.crearTabla("tipoPlanta")
  //datab.crearTabla("mail")
  //datab.crearUsuario("lola", "rica")
  //datab.crearUsuario("lola2", "rica")
  //datab.eliminarUsu("lola2")
  //datab.crearCFGMail("1", "1", "1", "1", "1")
  //datab.eliminarCFGMail("1")
  var cfgCorreo = datab.selectMail()
  console.log(cfgCorreo)

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
  	//var mail = new mailer("1")
})



function selectorDeVar (sDatosArduino) {
	console.log(sDatosArduino)
    var sDatos = sDatosArduino
    var sDatosPrefijo = sDatos.substring(0, 3)
    var iLargoDatos = sDatos.length
    var sDatosFinal = sDatos.substring(3, iLargoDatos)
    var sRetornoFunciones

    if (sDatosPrefijo == "#0#") { 
    	sRetornoFunciones = validarNivelAgua(sDatosFinal) 
    	sis.setNiveAguaValor(sDatosFinal)
    	sis.setNiveAgua(sRetornoFunciones)
    }
    if (sDatosPrefijo == "#1#") { 
		  sRetornoFunciones = validarClaridad(sDatosFinal) 
		  sis.setClaridadValor(sDatosFinal)
    	sis.setClaridad(sRetornoFunciones) 
    }
    
    if (sDatosPrefijo == "#2#") { sis.setHumedadPlanta1(sDatosFinal+" %") }
    if (sDatosPrefijo == "#3#") { sis.setHumedadPlanta2(sDatosFinal+" %") }
    if (sDatosPrefijo == "#4#") { sis.setHumedadPlanta3(sDatosFinal+" %") }
    if (sDatosPrefijo == "#5#") { sis.setHumedadAmbiente(sDatosFinal+" %") }
    if (sDatosPrefijo == "#6#") { sis.setTempAmbiente(sDatosFinal) }	
}

function validarNivelAgua (sDatos) {
	var iDatosObtenidos
	var sDatosAModelo

	iDatosObtenidos = parseInt(sDatos)
	if (iDatosObtenidos > 360) { sDatosAModelo = "Full" }	
	if ((iDatosObtenidos > 320) && (iDatosObtenidos < 360)) { sDatosAModelo = "Normal" }	
	if ((iDatosObtenidos > 200) && (iDatosObtenidos < 320)) { sDatosAModelo = "Reserva" }	
	if (iDatosObtenidos < 200) { sDatosAModelo = "Vacio" }

	return sDatosAModelo
}

function validarClaridad (sDatos) {
	var iDatosObtenidos
	var sDatosAModelo

	iDatosObtenidos = parseInt(sDatos)

	if (iDatosObtenidos >= 600) { sDatosAModelo = "Noche" }	
	if ((iDatosObtenidos >= 420) && (iDatosObtenidos < 600)) { sDatosAModelo = "Poca Luz" }	
	if ((iDatosObtenidos >= 200) && (iDatosObtenidos < 420)) { sDatosAModelo = "Normal" }	
	if (iDatosObtenidos < 200) { sDatosAModelo = "Mucha Luz" }

	return sDatosAModelo
}

server.listen(3000, () => console.log('server on port 3000'))



