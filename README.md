# Sistema-de-riego-Arduino-Node

Sistema de riego automatizado creado para solucionar mi problema con las plantas. 
Lo hice un poco más abstracto para que pudiera ser usado fácilmente por otra persona.

•	Interfaz web sencillo.

•	Login y sesiones para poder iniciar desde internet.

•	Posibilidad de crear tipos de plantas con diferentes humedades.

•	3 macetas con plantas modificables.

•	Envió de correo electrónico (Encender Arduino, Nivel agua bajo, Temperatura extremas, riego, etc.)

•	Modificación fácil de valores de riego (Iluminación mínima, máxima, etc)

•	Creación de registros diario con el valor de los sensores.

•	Bats para una instalación fácil.

•	Permanencia de datos con mysql

•	Órdenes directas desde Node al Arduino

•	Diagrama de instalación Arduino (“sistema de riego.fzz”)

***********************************************************************************

SENSORES:

Nivel de agua : Valores (0-400)

Fotocelda : Valores (0-1000)

Sensor de humedad 1 : Valores (0-100)

Sensor de humedad 2 : Valores (0-100)

Sensor de humedad 3 : Valores (0-100)

Temp ambiente : Valores (0-100)

Humedad ambiente : Valores (0-100)

***********************************************************************************

VALORES DE RIEGO POR DEFECTO

En el caso que se pierda conexión con la base de datos, no se configuraran otros valores de riego a los que tiene por defecto riem0n o no se encuentre conectado al ordenador tomara los siguientes valores.

int NIVEL_AGUA_MIN = 200;(Menor a 200 ya se encontraría en reserva)

int CLARIDAD_MIN = 420;(iluminación tarde)

int CLARIDAD_MAX = 800;(iluminación noche)

int TEMPERATURA_MIN = 15;

int TEMPERATURA_MAX = 40;

int HUMEDAD_MIN_PLANTA_1 = 45;

int HUMEDAD_MIN_PLANTA_2 = 45;

int HUMEDAD_MIN_PLANTA_3 = 45;

***********************************************************************************

INSTALACION:

Pasos previos:

-Instalar servidor de base de datos :

Si no se tiene ningún servidor de base de datos instalado procederemos a instalar "WAMPSERVER" es un servidor fácil de instalar y usar.

link de descarga:
  
  32 bits
  
  www.wampserver.es/downloads/wampserver2.2e-php5.4.3-httpd2.2.22-mysql5.5.24-32b.exe
  
  64 bits 
  www.wampserver.es/downloads/wampserver2.2e-php5.4.3-httpd-2.4.2-mysql5.5.24-x64.exe

  Tutorial oficial de como instalarlo
  
  https://www.youtube.com/watch?v=7LfVHhmyj4M
	
-Cambiar contraseñas por defecto de wamp :

por seguridad procederemos a cambiar contraseña por defecto. usuario "root" clave "" a usuario "root" clave "L3nt3j4"
			
  link de un usuario que lo cambia
 
  http://eldesvandejose.com/2016/09/25/cambiar-la-contrasena-de-root-en-phpmyadmin/
			
  Nota: Si se quiere usar otra clave se tiene que cambiar en los bats de instalación crearDatabase.bat y variablesDeEntorno.bat

Ejecución de bats

-Crear variables de entorno :
  
  Dentro de la ruta "SistemaDeRiego\install\1" se encuentra un .bat el que creara las siguientes variables de entorno es importante ejecutarlo como administrador

RIEMON_SERVER_SQL /m "127.0.0.1"  <--- IP servidor mysql

RIEMON_PORT_SQL /m "3306"				  <--- Es importante que nuestro server use el puerto por defecto de mysql

RIEMON_USER_SQL /m "root"				  <--.

RIEMON_PASS_SQL /m "L3nt3j4"         | Usuario y password modificar segun nuestra configuracion de mysql

RIEMON_DB_SQL /m "riemon"         <--- No cambiar este valor

RIEMON_DB_VAL1 /m "papa"          <--.

RIEMON_DB_VAL2 /m "frita"				     | Estas son claves que nos pedirá a la hora de realizar la instalación

RIEMON_DB_VAL3 /m "rica"             | inicial, wipe de tablas y restaurar configuración a la predeterminada
													               | si desea se pueden cambiar y usar personalizadas.
-Crear base de datos 
  Dentro de la ruta "SistemaDeRiego\install\2" se encuentran dos archivos esos tenemos que copiarlos a la carpeta donde se encuentra el ejecutable de mysql. en mi caso seria algo asi 

  C:\wamp64\bin\mysql\mysql5.7.21\bin 
  
  La carpeta varia según la versión que tengamos instalada del wamp pero básicamente será casi idéntica, sabremos que nos encontramos en la carpeta indicada cuando veamos el ejecutable mysql.exe

  Para facilitar esto en el acceso directo que nos crea WAMP haremos click derecho después click sobre propiedades y click sobre abrir ubicación después abriremos las carpetas en este orden bin > mysql > mysqlx.x.x > bin

  Procederemos a copiar los dos archivos y a ejecutar como administrador el archivo crearDatabase.bat

Preparar arduino y servidor de node

-Preparación arduino
  Físico:
  
  Seguir el esquema que se encuentra en la ruta "SistemaDeRiego\arduino\Sistemas de riego.fzz" para abrir este archivo necesitaremos un programa llamado "fritzing"
  
  link de descarga
  
  http://fritzing.org/download/
  
  Lógico:

  Abrir el archivo "SistemaDeRiego\arduino\SistemaDeRiego\SistemaDeRiego.ino con arduino IDLE y subir a la placa

-Preparación servidor node

  Instalar módulos necesarios

  Abrir un cmd, posicionarnos en la carpeta "\SistemaDeRiego\node" y escribir npm install
  Iniciar nuestro servidor (Es importante que se encuentre ejecutando el servidor de WAMP)
  en la misma carpeta que nos encontramos haremos npm start para que ejecute el script que iniciara el servidor
  para verificar que este todo bien abrimos un navegador y accedemos a la IP 127.0.0.1:3000

  Creación de tablas y datos genéricos
    Ahora ya desde la pagina principal donde nos pedirá unas credenciales para conectarnos haremos click sobre el link que dice "Configuración base de datos" nos abrirá una pagina donde pedirán 3 claves son las que previamente declaramos en las variables de entorno si no usaste alguna por defecto serán papa, frita, rica. Ahora seleccionamos "Puesta a punto inicial" en el menú desplegable y hacemos click sobre OK.

Despues de todo esto ya se encuentra listo para trabajar con Riemon.

***********************************************************************************

Iniciar Riemon.
	- Abrir ejecutable de WAMPSERVER.
	- Ejecutar servidor de node 
		Abrir un cmd, posicionarnos en la carpeta "\SistemaDeRiego\node" y escribir npm start

Acceder a interfaz web
	127.0.0.1:3000 (El usuario por defecto son: Usuario "admin" Clave "admin")

***********************************************************************************

TABLAS:

Usuarios

(id INT AUTO_INCREMENT PRIMARY KEY, 

usuario varchar(20) UNIQUE, 

password varchar(80))')

Plantas

(id INT AUTO_INCREMENT PRIMARY KEY,

 maceta INT(1) UNIQUE, 

planta varchar(40), 

humedad INT(2), 

notas varchar(120), 

imagen varchar(120))')

tipoPlanta

(id INT AUTO_INCREMENT PRIMARY KEY, 

planta varchar(40) UNIQUE, 

humedad INT(2), 

notas varchar(120), 

imagen varchar(120))')

Mail

(id INT AUTO_INCREMENT PRIMARY KEY, 

service varchar(40), 

usuario varchar(40), 

pass varchar(40), 

fromMail varchar(40), 

toMail varchar(120))')  

Registro

(id INT AUTO_INCREMENT PRIMARY KEY, 

fecha varchar(10), 

hora varchar(6), 

nivelAgua INT, 

claridad INT, 

planta1 varchar(40), 

humedadOptima1 INT, 

humedadPlanta1 INT,

planta2 varchar(40),

humedadOptima2 INT, 

humedadPlanta2 INT, 

planta3 varchar(40), 

humedadOptima3 INT, 

humedadPlanta3 INT, 

humedadAmbiente INT, 

tempAmbiente INT)')

HorasRegistro

(id INT AUTO_INCREMENT PRIMARY KEY, 

hora1 varchar(20), 

hora2 varchar(20), 

hora3 varchar(20))')

Instalación

(id INT AUTO_INCREMENT PRIMARY KEY, 

usaMail varchar(1),

usaRegistro varchar(1))') 
   
valoresParaRiego

(id INT AUTO_INCREMENT PRIMARY KEY,

nivelAguaMin INT, 

claridadMin INT, 

claridadMax INT,

tempMin INT, 

tempMax INT, 

humedadPlanta1 INT, 

humedadPlanta2 INT, 

humedadPlanta3 INT)')

***********************************************************************************

Variables de entorno 
    
sqlServer: process.env.RIEMON_SERVER_SQL,
    
sqlPort: process.env.RIEMON_PORT_SQL,
    
sqlUser: process.env.RIEMON_USER_SQL,
    
sqlPassword: process.env.RIEMON_PASS_SQL,
    
sqlDatabase: process.env.RIEMON_DB_SQL,
    
keyVal1: process.env.RIEMON_DB_VAL1,
    
keyVal2: process.env.RIEMON_DB_VAL2,
    
keyVal3: process.env.RIEMON_DB_VAL3

se crean  variables de entorno para la validación de puesta a punto inicial “papa” “frita” “rica”