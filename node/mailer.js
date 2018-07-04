const nodemailer = require("nodemailer")
var cfg = require("./cfg")
 
function sendMail (iTipo) {

    var serviceCFG = cfg.key.serviceMail
    var userCFG = cfg.key.usuMail
    var passCFG = cfg.key.passMail

    var sFrom = cfg.key.fromMail
    var sTo = cfg.key.toMail
    var sSubject 
    var sText

    var transporter = nodemailer.createTransport({
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

    var mailOptions = {
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