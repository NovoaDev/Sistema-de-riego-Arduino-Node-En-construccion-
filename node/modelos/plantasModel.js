var plantasModel = function () {
	this.maceta  = []
  this.planta  = []
  this.humedad = [] 
  this.notas   = []
  this.imagen  = []
}

plantasModel.prototype.getMaceta = function () {
  return this.maceta
}

plantasModel.prototype.getPlanta = function () {
  return this.planta
}

plantasModel.prototype.getHumedad = function () {
  return this.humedad
}

plantasModel.prototype.getNotas = function () {
  return this.notas
}

plantasModel.prototype.getImagen = function () {
  return this.imagen
}

plantasModel.prototype.setMaceta = function (sStats, iNumero) {
  this.maceta[iNumero] = sStats
}

plantasModel.prototype.setPlanta = function (sStats, iNumero) {
  this.planta[iNumero] = sStats
}

plantasModel.prototype.setHumedad = function (sStats, iNumero) {
  this.humedad[iNumero] = sStats
}

plantasModel.prototype.setNotas = function (sStats, iNumero) {
  this.notas[iNumero] = sStats
}

plantasModel.prototype.setImagen = function (sStats, iNumero) {
  this.imagen[iNumero] = sStats
}

module.exports = plantasModel