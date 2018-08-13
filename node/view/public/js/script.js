const socket = io();

const display0 = document.getElementById('valor0');
const display1 = document.getElementById('valor1');

const display7 = document.getElementById('senso0');
const display8 = document.getElementById('senso1');
const display9 = document.getElementById('senso2');
const display10 = document.getElementById('senso3');
const display11 = document.getElementById('senso4');
const display12 = document.getElementById('senso5');
const display13 = document.getElementById('senso6');

socket.on('selec0', function (data) {
	valor0.innerHTML = data;
});

socket.on('selec1', function (data) {
	valor1.innerHTML = data;
});

socket.on('selec2', function (data) {
	senso0.innerHTML = data;
});

socket.on('selec3', function (data) {
	senso1.innerHTML = data;
});

socket.on('selec4', function (data) {
	senso2.innerHTML = data;
});

socket.on('selec5', function (data) {
	senso3.innerHTML = data;
});

socket.on('selec6', function (data) {
	senso4.innerHTML = data;
});

socket.on('selec7', function (data) {
	senso5.innerHTML = data;
});

socket.on('selec8', function (data) {
	senso6.innerHTML = data;
});

function showContent(sTipo) {

	if (sTipo == "Mail") {
		element = document.getElementById("contentMail");
		testBtn = document.getElementById("contentMailTest");
	  check = document.getElementById("checkMail");
	  if (check.checked) {
	    element.style.display='block';
	    testBtn.style.display='block';
	  }
	  else {
	    element.style.display='none';
	    testBtn.style.display='none';
	  }
	}
	
	if (sTipo == "Registro") {
		element = document.getElementById("contentReg");
	  check = document.getElementById("checkReg");
	  if (check.checked) {
	    element.style.display='block';
	  }
	  else {
	    element.style.display='none';
	  }
	}
}