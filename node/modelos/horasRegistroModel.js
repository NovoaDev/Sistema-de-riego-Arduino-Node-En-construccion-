var horasRegistroModel = function () {
  this.hora1 = ""
  this.hora2 = ""
  this.hora3 = ""
}

//GETTERS
horasRegistroModel.prototype.getHora1 = function () {
  return this.hora1
}

horasRegistroModel.prototype.getHora2 = function () {
  return this.hora2
}

horasRegistroModel.prototype.getHora3 = function () {
  return this.hora3
}

//SETTERS
horasRegistroModel.prototype.setHora1 = function (sStats) {
  this.hora1 = sStats
}

horasRegistroModel.prototype.setHora2 = function (sStats) {
  this.hora2 = sStats
}

horasRegistroModel.prototype.setHora3 = function (sStats) {
  this.hora3 = sStats
}

module.exports = horasRegistroModel