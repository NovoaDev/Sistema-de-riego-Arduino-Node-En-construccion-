const nodemailer = require("nodemailer")
const datab = require('../utilidades/mysql')
 
function sendMail (iTipo) {

  datab.selectMail(function (oEmail) {

    if ((oEmail != "vacia") && (oEmail != "error")) {
      let serviceCFG = oEmail.service
      let userCFG = oEmail.usuario
      let passCFG = oEmail.pass

      let sFrom = oEmail.fromMail
      let sTo = oEmail.toMail
      let sSubject 
      let sText

      let transporter = nodemailer.createTransport({
          service: serviceCFG,
          auth: {
              user: userCFG,
              pass: passCFG
          }
      })

      switch (iTipo) {
          case "1":
              sSubject = "Cambio de estado RieMon! - Nivel de agua bajo"
              sText = "Nivel de agua bajo"
              break
          case "2":
              sSubject = "Cambio de estado RieMon! - Se ha regado"
              sText = "Se ha regado"
              break
          case "3":
              sSubject = "Cambio de estado RieMon! - Temperaturas Anormales"
              sText = "Temperaturas Anormales"
              break
          case "4":
              sSubject = "Cambio de estado RieMon! - Apagado de luz"
              sText = "Apagado de luz"
              break
          case "5":
              sSubject = "Cambio de estado RieMon! - Encendido de luz"
              sText = "Encendido de luz"
              break
          case "6":
              sSubject = "Cambio de estado RieMon! - Humedad Anormal"
              sText = "Humedad Anormal"
              break
          case "99":
              sSubject = "Cambio de estado RieMon! - Se ha iniciado RieMon"
              sText = "Se ha iniciado RieMon"
              break
      }

      let mailOptions = {
          from: sFrom, to: sTo,
          subject: sSubject,
          text: sText,
      }
   
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error)
          }
          console.log("Mensaje enviado: " + info.response)
      })
    }
  })
}

module.exports = sendMail