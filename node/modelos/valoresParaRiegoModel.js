var valoresParaRiego = function () {
  this.nivelAguaMin = ""
  this.claridadMin = ""
  this.claridadMax = ""
  this.tempMin = ""
  this.tempMax = ""
  this.humedad1 = ""
  this.humedad2 = ""
  this.humedad3 = ""
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

valoresParaRiego.prototype.getHumedad1 = function () {
  return this.humedad1
}

valoresParaRiego.prototype.getHumedad2 = function () {
  return this.humedad2
}

valoresParaRiego.prototype.getHumedad3 = function () {
  return this.humedad3
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

valoresParaRiego.prototype.setHumedad1 = function (sStats) {
  this.humedad1 = sStats
}

valoresParaRiego.prototype.setHumedad2 = function (sStats) {
  this.humedad2 = sStats
}

valoresParaRiego.prototype.setHumedad3 = function (sStats) {
  this.humedad3 = sStats
}

module.exports = valoresParaRiego