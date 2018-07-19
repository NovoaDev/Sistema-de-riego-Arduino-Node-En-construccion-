const nodemailer = require("nodemailer")
const cfg = require("./cfg")
const datab = require('../utilidades/mysql')
 
function sendMail (iTipo) {

    mail = datab.selectMail()
    console.log(mail)
    let serviceCFG = cfg.key.serviceMail
    let userCFG = cfg.key.usuMail
    let passCFG = cfg.key.passMail

    let sFrom = cfg.key.fromMail
    let sTo = cfg.key.toMail
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

module.exports = sendMail