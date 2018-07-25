function validarHora (sHora1, sHora2, sHora3) {
	let date = new Date()
	let hora = date.getHours()
	let minutos = date.getMinutes()
	let sHoraActural =  hora+":"+minutos
	let bRetorno
	
	bRetorno = false
	
  if ((sHoraActural == sHora1) || (sHoraActural == sHora2) || (sHoraActural == sHora3)) { bRetorno = true }

	return bRetorno
}

module.exports = validarHora