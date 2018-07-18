var tipoPlantaModel = function () {
  this.planta  = []
  this.humedad = [] 
  this.notas   = []
  this.imagen  = []
}

tipoPlantaModel.prototype.setPlanta = function (sStats, iNumero) {
  this.planta[iNumero] = sStats
}

tipoPlantaModel.prototype.setHumedad = function (sStats, iNumero) {
  this.humedad[iNumero] = sStats
}

tipoPlantaModel.prototype.setNotas = function (sStats, iNumero) {
  this.notas[iNumero] = sStats
}

tipoPlantaModel.prototype.setImagen = function (sStats, iNumero) {
  this.imagen[iNumero] = sStats
}

module.exports = tipoPlantaModel