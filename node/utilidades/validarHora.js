function validarHora (sHora) {
	let date = new Date()
	let hora = date.getHours()
	let bRetorno
	
	bRetorno = false
  if ((hora > sHora)) { bRetorno = true }

	return bRetorno
}

module.exports = validarHora