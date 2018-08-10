function random (minimo, maximo) {
  var number = Math.floor( Math.random() * (maximo - minimo + 1) + minimo )
  return number
}

module.exports = random

