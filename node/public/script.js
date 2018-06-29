const socket = io();

const display0 = document.getElementById('senso0');
const display1 = document.getElementById('senso1');
const display2 = document.getElementById('senso2');
const display3 = document.getElementById('senso3');
const display4 = document.getElementById('senso4');
const display5 = document.getElementById('senso5');
const display6 = document.getElementById('senso6');

socket.on('selec0', function (data) {
  senso0.innerHTML = data;
});

socket.on('selec1', function (data) {
  senso1.innerHTML = data;
});

socket.on('selec2', function (data) {
  senso2.innerHTML = data;
});

socket.on('selec3', function (data) {
  senso3.innerHTML = data;
});

socket.on('selec4', function (data) {
  senso4.innerHTML = data;
});

socket.on('selec5', function (data) {
  senso5.innerHTML = data;
});

socket.on('selec6', function (data) {
  senso6.innerHTML = data;
});