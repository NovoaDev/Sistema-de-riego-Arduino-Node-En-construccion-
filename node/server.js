const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const SerialPort = require('serialport')

const app = express()
const server = http.createServer(app)
const io = socketIo.listen(server)
const ReadLine = SerialPort.parsers.Readline
const parser = new ReadLine()

const port = 3000

//app.get('/', (req, res, next) => {
//	res.sendFile('index.html')
//})


app.get('/', function (req, res) {
  res.sendfile('index.html')
})


const mySerial = new SerialPort('COM3', {
	baudRate: 9600
})

mySerial.on('open', function () {
	console.log("Puerto serial abierto")
})


mySerial.on('data', function (data) {
	console.log(data.toString())
	io.emit('arduino:data', {
		value: data.toString()
	})
})

mySerial.on('err', function (err) {
	console.log(err.message())
})

app.listen(port, function () {
  console.log('Arrancoo el Server puerto: ' + port + '!.')
})


//Sub string ejemplo
function myFunction() {
    var str = "Hello world!";
    var res = str.substring(0, 4);
    document.getElementById("demo").innerHTML = res;
}

// falta modificar index.html para poder importar socket.io cliente que da error 









