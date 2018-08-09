const http = require('http')
const express = require('express')
const SocketIO = require('socket.io')
const SerialPort = require('serialport')
const bParser = require('body-parser')
const mailer = require('./utilidades/mailer')
const datab = require('./utilidades/mysql')
const val = require('./utilidades/validarValoresSensores')
const valHora = require('./utilidades/validarHora')
const arduinoModel = require('./modelos/arduinoModel')

const app = express()
const server = http.createServer(app)
const io = SocketIO.listen(server)
const ReadLine = SerialPort.parsers.Readline

const sis = new arduinoModel()
//let mail = new mailer("99")

const port = new SerialPort("COM3", { baudRate: 9600 })
const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }))

//Middleware`s
app.use(express.static(__dirname + '/view/public'))
app.use(bParser.urlencoded({extended: true}))
app.set("view engine", "jade")

let bLuzEncendida = false
//---------------------------------------------------------------------------------------------------------------------------------- IO
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
})
//---------------------------------------------------------------------------------------------------------------------------------- IO

//---------------------------------------------------------------------------------------------------------------------------------- GET

app.get('/', function (req, res) {
  res.render(__dirname + '/view/index',{titulo: "Riem0n! - Login!"}) 
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
  //datab.crearTabla("registro")

  //datab.crearUsuario("lola", "rica")
  //datab.crearUsuario("lola2", "rica")
  //datab.eliminarUsu("lola2")
  //datab.crearCFGMail("1", "1", "1", "1", "1")
  //datab.eliminarCFGMail("1")

  
  //inicio test arry dentro de objeto tipoPlanta
  //datab.crearTipoPlanta("coco", 20, "planta de coco cuidar con la vida", "C:/coso")
  //datab.crearTipoPlanta("coco1", 21, "planta de coco cuidar con la vida1", "C:/coso")
  //datab.crearTipoPlanta("coco2", 22, "planta de coco cuidar con la vida2", "C:/coso")
  //datab.crearTipoPlanta("coco3", 23, "planta de coco cuidar con la vida3", "C:/coso")
  //datab.crearTipoPlanta("coco4", 24, "planta de coco cuidar con la vida4", "C:/coso")
  //datab.crearTipoPlanta("coco5", 25, "planta de coco cuidar con la vida5", "C:/coso")
  //datab.crearTipoPlanta("coco6", 26, "planta de coco cuidar con la vida6", "C:/coso")
  //datab.crearTipoPlanta("coco7", 27, "planta de coco cuidar con la vida7", "C:/coso")
  //datab.crearTipoPlanta("coco8", 28, "planta de coco cuidar con la vida8", "C:/coso")
  //datab.crearTipoPlanta("coco9", 29, "planta de coco cuidar con la vida9", "C:/coso")
  //datab.crearTipoPlanta("coco10", 30, "planta de coco cuidar con la vida10", "C:/coso")
  //datab.crearTipoPlanta("coco11", 31, "planta de coco cuidar con la vida11", "C:/coso")
  //FIN test arry dentro de objeto tipoPlanta 
  

  
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

  //var lolaaa = valHora("12:30", "18:35", "18:52")
  //enviarConfig (0, "66")
  //enviarConfig (1, "11")
  //enviarConfig (2, "22")
  //enviarConfig (3, "33")
  //enviarConfig (4, "44")
  //enviarConfig (5, "55")
  //enviarConfig (6, "66")
  //enviarConfig (7, "77")

//enviarConfig(8, "1") 
//enviarConfig(8, "2") 
//enviarConfig(8, "3") 
//enviarConfig(8, "5")
//enviarConfig(8, "4")
//enviarConfig(9, "") // devuelve por console.log todas las variables de riego que se rellenan en el arduino

})

//---------------------------------------------------------------------------------------------------------------------------------- GET

//---------------------------------------------------------------------------------------------------------------------------------- POST

app.post('/entrar', function (req, res) {
  let usu = req.body.usuario
  let pass = req.body.password
  let selectorPagina = req.body.selectorPagina
  let login = false
  
  datab.validarUsu(usu, pass, function (vali) {
    if (vali) {
      switch (selectorPagina) {
        case "0" :
          res.render(__dirname + '/view/main',{titulo: "Riem0n!"})
        break
        case "1" :
          datab.selectTipoPlanta("", function (oPlantas) {
            if ((oPlantas != "vacia") && (oPlantas != "error")) {
              let plantas = []
              oPlantas.planta.forEach(function(result) {
                plantas.push(result)
              })
              res.render(__dirname + '/view/actualizarVariables',{titulo: "Riem0n! - Valores para riego!", plantas: plantas})
            } else {
              res.send("Tabla tipoPlanta Vacia")
            }
          })

        break
        case "2" :
          res.render(__dirname + '/view/main',{titulo: "Riem0n!"})
        break
        case "3" :
          res.render(__dirname + '/view/puestaapunto',{titulo: "Riem0n!"})
        break
      } 
      let login = true
    } else {
      res.send('Usuario o clave incorrecta ')
      let login = false
    }
  })
})

app.post('/puestaAPunto', function (req, res) {

  let sVal1 = req.body.validar1
  let sVal2 = req.body.validar2
  let sVal3 = req.body.validar3
  
  datab.validarUsu(sVal1, sVal2, sVal3, function (vali) {
    if (vali) {
      datab.selectPlantas(function (oPlantas) {
        if ((oPlantas != "vacia") && (oPlantas != "error")) {
          res.send('Puesta a punto inicial')
          //CREAR TABLAS
          datab.crearTabla("usuarios")
          datab.crearTabla("plantas")
          datab.crearTabla("tipoPlanta")
          datab.crearTabla("mail")
          datab.crearTabla("registro")
          datab.crearTabla("horasRegistro")
          datab.crearTabla("valoresParaRiego")

          //CREAR USUARIO GENERICO
          datab.crearUsuario("admin", "admin")

          //CREAR PLANTAS GENERICAS
          datab.crearPlantas(1, "generica", 70, "Planta generica 70% humedad", "C:/coso")
          datab.crearPlantas(2, "generica", 70, "Planta generica 70% humedad", "C:/coso")
          datab.crearPlantas(3, "generica", 70, "Planta generica 70% humedad", "C:/coso")

          //CREAR TIPOPLANTA GENERICO
          datab.crearTipoPlanta("generica", 70, "Planta generica 70% humedad", "C:/coso")

          //MAIL, REGISTRO Y HORAS REGISTRO NO SE CREA NADA POR DEFECTO SI QUIEREN HABILITARSE SE HACE DESDE EL APARTADO DE CONFIGURACIONES. 

          //CREAR VALORES PARA RIEGO POR DEFECTO //REVISAR
          datab.crearValoresParaRiego(20, 70, 90, 40, 80)  
        } else {
          res.send('Ya existe registros para una puesta a punto realice wipe primero')
        }
      })
    } else {
      res.send('Clave de validacion incorrecta')
    }
  })
})

app.post('/actualizarVariablesP', function (req, res) {
  let sVar0 = req.body.var0
  let sVar1 = req.body.var1
  let sVar2 = req.body.var2
  let sVar3 = req.body.var3
  let sVar4 = req.body.var4
  let sVar5 = req.body.var5
  let sVar6 = req.body.var6
  let sVar7 = req.body.var7

  if ((sVar0 != undefined) && (sVar0 != '')) { setTimeout(function(){enviarConfig(0, sVar0) } ,1000) }
  if ((sVar1 != undefined) && (sVar1 != '')) { setTimeout(function(){enviarConfig(1, sVar1) } ,1000) }
  if ((sVar2 != undefined) && (sVar2 != '')) { setTimeout(function(){enviarConfig(2, sVar2) } ,1000) }
  if ((sVar3 != undefined) && (sVar3 != '')) { setTimeout(function(){enviarConfig(3, sVar3) } ,1000) }
  if ((sVar4 != undefined) && (sVar4 != '')) { setTimeout(function(){enviarConfig(4, sVar4) } ,1000) }
  if ((sVar5 != undefined) && (sVar5 != '')) { setTimeout(function(){enviarConfig(5, sVar5) } ,1000) }
  if ((sVar6 != undefined) && (sVar6 != '')) { setTimeout(function(){enviarConfig(6, sVar6) } ,1000) }
  if ((sVar7 != undefined) && (sVar7 != '')) { setTimeout(function(){enviarConfig(7, sVar7) } ,1000) }


})

app.post('/plantas', function (req, res) {
  let sPlanta1 = req.body.planta1
  let sPlanta2 = req.body.planta2
  let sPlanta3 = req.body.planta3

  datab.selectTipoPlanta(sPlanta1, function (oPlanta) {
      datab.updatePlantas(1, oPlanta.planta, oPlanta.humedad, oPlanta.notas, oPlanta.imagen)
  })
  datab.selectTipoPlanta(sPlanta2, function (oPlanta) {
      datab.updatePlantas(2, oPlanta.planta, oPlanta.humedad, oPlanta.notas, oPlanta.imagen)
  })
  datab.selectTipoPlanta(sPlanta3, function (oPlanta) {
      datab.updatePlantas(3, oPlanta.planta, oPlanta.humedad, oPlanta.notas, oPlanta.imagen)
  })
})


//Ordenes directas al arduino 
app.post('/regar1', function (req, res) {
  enviarConfig(8, "1")
})

app.post('/regar2', function (req, res) {
  enviarConfig(8, "2")   
})

app.post('/regar3', function (req, res) {
  enviarConfig(8, "3") 
})

app.post('/luzOnOff', function (req, res) {
  if (bLuzEncendida) { 
    enviarConfig(8, "4")
    bLuzEncendida = false   
  } else {
    enviarConfig(8, "5")
    bLuzEncendida = true
  }
})

app.post('/verPlantas', function (req, res) {
  
  datab.selectTipoPlanta("", function (oPlantas) {
    if ((oPlantas != "vacia") && (oPlantas != "error")) {
      res.send(oPlantas) //
    }
  })
})

//---------------------------------------------------------------------------------------------------------------------------------- POST

//---------------------------------------------------------------------------------------------------------------------------------- FUNC

function selectorDeVar (sDatosArduino) {
  let sDatos = sDatosArduino
  let sDatosPrefijo = sDatos.substring(0, 4)
  let iLargoDatos = sDatos.length
  let sDatosFinal = sDatos.substring(4, iLargoDatos)
  let sRetornoFunciones

  //0-10 Datos sensores arduino.
  if (sDatosPrefijo == "#00#") { 
  	sRetornoFunciones = val.validarNivelAgua(sDatosFinal) 
  	sis.setNiveAguaValor(sDatosFinal)
  	sis.setNiveAgua(sRetornoFunciones)
  }
  if (sDatosPrefijo == "#01#") { 
	  sRetornoFunciones = val.validarClaridad(sDatosFinal) 
	  sis.setClaridadValor(sDatosFinal)
  	sis.setClaridad(sRetornoFunciones) 
  }
  
  if (sDatosPrefijo == "#02#") { sis.setHumedadPlanta1(sDatosFinal+" %") }
  if (sDatosPrefijo == "#03#") { sis.setHumedadPlanta2(sDatosFinal+" %") }
  if (sDatosPrefijo == "#04#") { sis.setHumedadPlanta3(sDatosFinal+" %") }
  if (sDatosPrefijo == "#05#") { sis.setHumedadAmbiente(sDatosFinal+" %") }
  if (sDatosPrefijo == "#06#") { sis.setTempAmbiente(sDatosFinal) }	

  //20 Datos de las variables recien actualizados arduino. 
  if (sDatosPrefijo == "#20#") { console.log("NIVEL_AGUA_MIN Actualizado : "+ sDatosFinal) }
  if (sDatosPrefijo == "#21#") { console.log("CLARIDAD_MIN Actualizado : "+ sDatosFinal) }    
  if (sDatosPrefijo == "#22#") { console.log("CLARIDAD_MAX Actualizado : "+ sDatosFinal) }
  if (sDatosPrefijo == "#23#") { console.log("TEMPERATURA_MIN Actualizado : "+ sDatosFinal) }
  if (sDatosPrefijo == "#24#") { console.log("TEMPERATURA_MAX Actualizado : "+ sDatosFinal) }
  if (sDatosPrefijo == "#25#") { console.log("HUMEDAD_MIN_PLANTA_1 Actualizado : "+ sDatosFinal) }
  if (sDatosPrefijo == "#26#") { console.log("HUMEDAD_MIN_PLANTA_2 Actualizado : "+ sDatosFinal) }
  if (sDatosPrefijo == "#27#") { console.log("HUMEDAD_MIN_PLANTA_3 Actualizado : "+ sDatosFinal) }

  //80 Validar datos variables actuales en el arduino.
  if (sDatosPrefijo == "#80#") { console.log("NIVEL_AGUA_MIN Actual : "+ sDatosFinal) }
  if (sDatosPrefijo == "#81#") { console.log("CLARIDAD_MIN Actual : "+ sDatosFinal) }    
  if (sDatosPrefijo == "#82#") { console.log("CLARIDAD_MAX Actual : "+ sDatosFinal) }
  if (sDatosPrefijo == "#83#") { console.log("TEMPERATURA_MIN Actual : "+ sDatosFinal) }
  if (sDatosPrefijo == "#84#") { console.log("TEMPERATURA_MAX Actual : "+ sDatosFinal) }
  if (sDatosPrefijo == "#85#") { console.log("HUMEDAD_MIN_PLANTA_1 Actual : "+ sDatosFinal) }
  if (sDatosPrefijo == "#86#") { console.log("HUMEDAD_MIN_PLANTA_2 Actual : "+ sDatosFinal) }
  if (sDatosPrefijo == "#87#") { console.log("HUMEDAD_MIN_PLANTA_3 Actual : "+ sDatosFinal) }

  //90 uso multiple para verificar conexiones, alcances, etc.
  if (sDatosPrefijo == "#90#") { console.log("DatosFinal a Arduino : "+ sDatosFinal) }

}

function guardarReg (oSis) {

  datab.selectHoraReg(function (oSIS, oHoras) {
    let bGrabar

    if ((oHoras != "vacia") && (oHoras != "error")) {

      let sT1 = oHoras.hora1
      let sT2 = oHoras.hora2
      let sT3 = oHoras.hora3
      
      bGrabar = valHora(sT1, sT2, sT3)

      if (bGrabar) {
        let dia = new Date(day, month, year)
        console.log(dia)
        let hora = date.getHours()
        let minutos = date.getMinutes()
        let sHoraActural =  hora+":"+minutos

        let iNivelAgua = sis.nivelAguaValor
        let iClaridad = sis.claridadValor
        let iHumedadPlanta1 = sis.humedadPlanta1
        let iHumedadPlanta2 = sis.humedadPlanta2 
        let iHumedadPlanta3 = sis.humedadPlanta3 
        let iHumedadAmbiente = sis.humedadAmbiente
        let iTempAmbiente =  sis.tempAmbiente

        datab.crearRegistro(dia, sHoraActural, iNivelAgua, iClaridad, iHumedadPlanta1, iHumedadPlanta2, iHumedadPlanta3, iHumedadAmbiente, iTempAmbiente)
      }
    }
  })
}

function enviarConfig (iOrden, sDatosA) {

  /* SENSOR         - Prefijo
     NIVEL_AGUA_MIN = 0
     CLARIDAD_MIN = 1
     CLARIDAD_MAX = 2
     TEMPERATURA_MIN = 3
     TEMPERATURA_MAX = 4
     HUMEDAD_MIN_PLANTA_1 = 5
     HUMEDAD_MIN_PLANTA_2 = 6
     HUMEDAD_MIN_PLANTA_3 = 7
  */
  
  if (iOrden == 0) port.write("#0#"+sDatosA+"\n")
  if (iOrden == 1) port.write("#1#"+sDatosA+"\n")
  if (iOrden == 2) port.write("#2#"+sDatosA+"\n")
  if (iOrden == 3) port.write("#3#"+sDatosA+"\n")
  if (iOrden == 4) port.write("#4#"+sDatosA+"\n")
  if (iOrden == 5) port.write("#5#"+sDatosA+"\n")
  if (iOrden == 6) port.write("#6#"+sDatosA+"\n")
  if (iOrden == 7) port.write("#7#"+sDatosA+"\n")

  //Ordenes Directas a Arduino
  if (iOrden == 8) port.write("#8#"+sDatosA+"\n")

  //Pedir valores variables arduino
  if (iOrden == 9) port.write("#9#\n")
}

//---------------------------------------------------------------------------------------------------------------------------------- FUNC

server.listen(3000, () => console.log('server on port 3000'))



