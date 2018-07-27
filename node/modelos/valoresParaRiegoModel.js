var valoresParaRiego = function () {
  this.nivelAguaMin = ""
  this.claridadMin = ""
  this.claridadMax = ""
  this.tempMin = ""
  this.tempMax = ""
}

//GETTERS
valoresParaRiego.prototype.getNivelAguaMin = function () {
  return this.nivelAguaMin
}

valoresParaRiego.prototype.getClaridadMin = function () {
  return this.claridadMin
}

valoresParaRiego.prototype.getClaridadMax = function () {
  return this.claridadMax
}

valoresParaRiego.prototype.getTempMin = function () {
  return this.tempMin
}

valoresParaRiego.prototype.getTempMax = function () {
  return this.tempMax
}

//SETTERS
valoresParaRiego.prototype.setNivelAguaMin = function (sStats) {
  this.nivelAguaMin = sStats
}

valoresParaRiego.prototype.setClaridadMin = function (sStats) {
  this.claridadMin = sStats
}

valoresParaRiego.prototype.setClaridadMax = function (sStats) {
  this.claridadMax = sStats
}

valoresParaRiego.prototype.setTempMin = function (sStats) {
  this.tempMin = sStats
}

valoresParaRiego.prototype.setTempMax = function (sStats) {
  this.tempMax = sStats
}

module.exports = valoresParaRiego