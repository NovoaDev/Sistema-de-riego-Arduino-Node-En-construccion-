var SistemaDeRiego = function () {
  this.nivelAgua = 0
  this.claridad = 0
  this.humedadPlanta1 = 0
  this.humedadPlanta2 = 0
  this.humedadPlanta3 = 0
  this.humedadAmbiente = 0
  this.tempAmbiente = 0
}

SistemaDeRiego.prototype.setNiveAgua = function (stats) {
  this.nivelAgua = stats
}

SistemaDeRiego.prototype.setClaridad = function (stats) {
  this.claridad = stats
}

SistemaDeRiego.prototype.setHumedadPlanta1 = function (stats) {
  this.humedadPlanta1 = stats
}

SistemaDeRiego.prototype.setHumedadPlanta2 = function (stats) {
  this.humedadPlanta2 = stats
}

SistemaDeRiego.prototype.setHumedadPlanta3 = function (stats) {
  this.humedadPlanta3 = stats
}

SistemaDeRiego.prototype.setHumedadAmbiente = function (stats) {
  this.humedadAmbiente = stats
}

SistemaDeRiego.prototype.setTempAmbiente = function (stats) {
  this.tempAmbiente = stats
}

module.exports = SistemaDeRiego