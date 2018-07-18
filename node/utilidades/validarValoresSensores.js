let validar = {}

// Validar Claridad --------------------------------------------------------------------------
validar.validarClaridad = function validarClaridad (sDatos) {
  var iDatosObtenidos
  var sDatosAModelo

  iDatosObtenidos = parseInt(sDatos)

  if (iDatosObtenidos >= 600) { sDatosAModelo = "Noche" } 
  if ((iDatosObtenidos >= 420) && (iDatosObtenidos < 600)) { sDatosAModelo = "Poca Luz" } 
  if ((iDatosObtenidos >= 200) && (iDatosObtenidos < 420)) { sDatosAModelo = "Normal" } 
  if (iDatosObtenidos < 200) { sDatosAModelo = "Mucha Luz" }

  return sDatosAModelo
}


validar.validarNivelAgua = function validarNivelAgua (sDatos) {
  var iDatosObtenidos
  var sDatosAModelo

  iDatosObtenidos = parseInt(sDatos)
  if (iDatosObtenidos > 360) { sDatosAModelo = "Full" } 
  if ((iDatosObtenidos > 320) && (iDatosObtenidos < 360)) { sDatosAModelo = "Normal" }  
  if ((iDatosObtenidos > 200) && (iDatosObtenidos < 320)) { sDatosAModelo = "Reserva" } 
  if (iDatosObtenidos < 200) { sDatosAModelo = "Vacio" }

  return sDatosAModelo
}

module.exports = validar
