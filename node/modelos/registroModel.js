var registroModel = function () {
	this.fecha  = []
  this.hora  = []
  this.nivelAgua = [] 
  this.claridad   = []
  this.planta1  = []
  this.humedadOptima1  = []
  this.humedadPlanta1  = []
	this.planta2  = []
  this.humedadOptima2  = []
  this.humedadPlanta2  = []
  this.planta3  = []
  this.humedadOptima3  = []
  this.humedadPlanta3  = []
  this.humedadAmbiente  = []
  this.tempAmbiente  = []
}

registroModel.prototype.getfecha           = function () { return this.fecha }
registroModel.prototype.gethora            = function () { return this.hora }
registroModel.prototype.getNivelAgua       = function () { return this.nivelAgua }
registroModel.prototype.getClaridad        = function () { return this.claridad }
registroModel.prototype.getPlanta1         = function () { return this.planta1 }
registroModel.prototype.getHumedadOptima1  = function () { return this.humedadOptima1 }
registroModel.prototype.getHumedadPlanta1  = function () { return this.humedadPlanta1 }
registroModel.prototype.getPlanta2         = function () { return this.planta2 }
registroModel.prototype.getHumedadOptima2  = function () { return this.humedadOptima2 }
registroModel.prototype.getHumedadPlanta2  = function () { return this.humedadPlanta2 }
registroModel.prototype.getPlanta3         = function () { return this.planta3 }
registroModel.prototype.getHumedadOptima3  = function () { return this.humedadOptima3 }
registroModel.prototype.getHumedadPlanta3  = function () { return this.humedadPlanta3 }
registroModel.prototype.getHumedadAmbiente = function () { return this.humedadAmbiente }
registroModel.prototype.getTempAmbiente    = function () { return this.tempAmbiente }

registroModel.prototype.setFecha           = function (sStats, iNumero) { this.fecha[iNumero] = sStats }
registroModel.prototype.setHora            = function (sStats, iNumero) { this.hora[iNumero] = sStats }
registroModel.prototype.setNivelAgua       = function (sStats, iNumero) { this.nivelAgua[iNumero] = sStats }
registroModel.prototype.setClaridad        = function (sStats, iNumero) { this.claridad[iNumero] = sStats }
registroModel.prototype.setPlanta1         = function (sStats, iNumero) { this.planta1[iNumero] = sStats }
registroModel.prototype.setHumedadOptima1  = function (sStats, iNumero) { this.humedadOptima1[iNumero] = sStats }
registroModel.prototype.setHumedadPlanta1  = function (sStats, iNumero) { this.humedadPlanta1[iNumero] = sStats }
registroModel.prototype.setPlanta2         = function (sStats, iNumero) { this.planta2[iNumero] = sStats }
registroModel.prototype.setHumedadOptima2  = function (sStats, iNumero) { this.humedadOptima2[iNumero] = sStats }
registroModel.prototype.setHumedadPlanta2  = function (sStats, iNumero) { this.humedadPlanta2[iNumero] = sStats }
registroModel.prototype.setPlanta3         = function (sStats, iNumero) { this.planta3[iNumero] = sStats }
registroModel.prototype.setHumedadOptima3  = function (sStats, iNumero) { this.humedadOptima3[iNumero] = sStats }
registroModel.prototype.setHumedadPlanta3  = function (sStats, iNumero) { this.humedadPlanta3[iNumero] = sStats }

registroModel.prototype.setHumedadAmbiente = function (sStats, iNumero) { this.humedadAmbiente[iNumero] = sStats }
registroModel.prototype.setTempAmbiente    = function (sStats, iNumero) { this.tempAmbiente[iNumero] = sStats }
  
module.exports = registroModel