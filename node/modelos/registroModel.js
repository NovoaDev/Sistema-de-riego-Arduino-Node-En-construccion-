var registroModel = function () {
	this.fecha  = []
  this.hora  = []
  this.nivelAgua = [] 
  this.claridad   = []
  this.humedadPlanta1  = []
  this.humedadPlanta2  = []
  this.humedadPlanta3  = []
  this.humedadAmbiente  = []
  this.tempAmbiente  = []
}

registroModel.prototype.getfecha           = function () { return this.fecha }

registroModel.prototype.gethora            = function () { return this.hora }

registroModel.prototype.getNivelAgua       = function () { return this.nivelAgua }

registroModel.prototype.getClaridad        = function () { return this.claridad }

registroModel.prototype.getHumedadPlanta1  = function () { return this.humedadPlanta1 }

registroModel.prototype.getHumedadPlanta2  = function () { return this.humedadPlanta2 }

registroModel.prototype.getHumedadPlanta3  = function () { return this.humedadPlanta3 }

registroModel.prototype.getHumedadAmbiente = function () { return this.humedadAmbiente }

registroModel.prototype.getTempAmbiente    = function () { return this.tempAmbiente }

registroModel.prototype.setFecha           = function (sStats, iNumero) { this.fecha[iNumero] = sStats }

registroModel.prototype.setHora            = function (sStats, iNumero) { this.hora[iNumero] = sStats }

registroModel.prototype.setNivelAgua       = function (sStats, iNumero) { this.nivelAgua[iNumero] = sStats }

registroModel.prototype.setClaridad        = function (sStats, iNumero) { this.claridad[iNumero] = sStats }

registroModel.prototype.setHumedadPlanta1  = function (sStats, iNumero) { this.humedadPlanta1[iNumero] = sStats }

registroModel.prototype.setHumedadPlanta2  = function (sStats, iNumero) { this.humedadPlanta2[iNumero] = sStats }

registroModel.prototype.setHumedadPlanta3  = function (sStats, iNumero) { this.humedadPlanta3[iNumero] = sStats }

registroModel.prototype.setHumedadAmbiente = function (sStats, iNumero) { this.humedadAmbiente[iNumero] = sStats }

registroModel.prototype.setTempAmbiente    = function (sStats, iNumero) { this.tempAmbiente[iNumero] = sStats }
  
module.exports = registroModel