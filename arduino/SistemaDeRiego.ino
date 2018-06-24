#include <SimpleDHT.h>
#include <Servo.h>

//----------------------------------- Asociacion las salidas correspondiente.
// Analogicas
#define MEDIDOR_NIVEL_AGUA A0
#define FOTOCELDA A1
#define SENSOR_SUELO_1 A2
#define SENSOR_SUELO_2 A3
#define SENSOR_SUELO_3 A4

//Digitales
#define MEDIDOR_hUMEDAD_TEMP 2
#define LED_ROJO 3
#define LED_VERDE 4
#define LED_AZUL 5
#define SERVO 9

//Variables
int NIVEL_AGUA = 0;           //SENSOR NIVELAGUA
char PRINTBUFFER[128];        //SENSOR NIVELAGUA

int VALOR_CLARIDAD = 0;       //SENSOR FOTOCELDA    

int HUMEDADA_TEMP;            //SENSOR HUMEDAD SUELO 
int HUMEDADA_FINAL_1;         //SENSOR HUMEDAD SUELO
int HUMEDADA_FINAL_2;         //SENSOR HUMEDAD SUELO 
int HUMEDADA_FINAL_3;         //SENSOR HUMEDAD SUELO

byte VALOR_HUMEDAD = 0;       //SENSOR HUMEDAD/TEMP
byte VALOR_TEMPERATURA = 0;   //SENSOR HUMEDAD/TEMP

#define delayTime 10 //LEDS

int POSICION = 0;             // SERVO 
int IPOSICIONACTUAL = 1;      // SERVO 

// Crear Obj
SimpleDHT11 DHT11;
Servo MYSERVO;  

void setup(){
  Serial.begin(9600);
  
  pinMode(FOTOCELDA,INPUT); 
  MYSERVO.attach(SERVO); 

  pinMode(LED_ROJO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_AZUL, OUTPUT);
  
  // Valores iniciales led
  digitalWrite(LED_ROJO, LOW);
  digitalWrite(LED_VERDE, LOW);
  digitalWrite(LED_AZUL, LOW);
}

void loop(){
  delay(5000);
  obtenerOtros();
  obtenerValoresPlantas();
 delay(5000);
 //mover_Servo(1);
 //delay(1000);
 //mover_Servo(2);
 //delay(1000);
 //mover_Servo(3);
}

void obtenerOtros(){
  obtener_Nivel_Del_Agua();
  obtener_Humedad_Temperatura();
  obtener_Claridad();
}

void obtenerValoresPlantas(){
  obtenerHumedadSuelo(1);
  obtenerHumedadSuelo(2);
  obtenerHumedadSuelo(3);
}

void obtener_Nivel_Del_Agua (){
  NIVEL_AGUA = analogRead(MEDIDOR_NIVEL_AGUA);

  sprintf(PRINTBUFFER,"#0#",MEDIDOR_NIVEL_AGUA, NIVEL_AGUA);
  Serial.println(PRINTBUFFER);
}

void obtener_Claridad (){
  VALOR_CLARIDAD = analogRead(FOTOCELDA);
  Serial.println("#1#"+(String(VALOR_CLARIDAD)));
}

void obtenerHumedadSuelo(int IPLANTA) {
  if (IPLANTA == 1) {
    HUMEDADA_FINAL_1 = 0;         
    HUMEDADA_TEMP = map(analogRead(SENSOR_SUELO_1), 0, 1023, 100, 0);
    HUMEDADA_FINAL_1 = constrain (HUMEDADA_TEMP, 0, 100);
    Serial.println("#2#"+(String((HUMEDADA_FINAL_1))));
  } else if (IPLANTA == 2) {
    HUMEDADA_FINAL_2 = 0; 
    HUMEDADA_TEMP = map(analogRead(SENSOR_SUELO_2), 0, 1023, 100, 0);
    HUMEDADA_FINAL_2 = constrain (HUMEDADA_TEMP, 0, 100);
    Serial.println("#3#"+(String((HUMEDADA_FINAL_2))));
  } else if (IPLANTA == 3) {
    HUMEDADA_FINAL_3 = 0; 
    HUMEDADA_TEMP = map(analogRead(SENSOR_SUELO_3), 0, 1023, 100, 0);
    HUMEDADA_FINAL_3 = constrain (HUMEDADA_TEMP, 0, 100);   
    Serial.println("#4#"+(String((HUMEDADA_FINAL_3)))); 
  }
}

void obtener_Humedad_Temperatura () {
  byte DATA[40] = {0};
  if (DHT11.read(MEDIDOR_hUMEDAD_TEMP, &VALOR_TEMPERATURA, &VALOR_HUMEDAD, DATA)) {
      Serial.println("#5#Error");
      Serial.println("#6#Error");
    return;
  }
  Serial.println("#5#"+(String((int)VALOR_HUMEDAD)));
  Serial.println("#6#"+(String((int)VALOR_TEMPERATURA)));
}

void mover_Servo(int IPLANTA) {
  if (IPLANTA == 1) {
    MYSERVO.write(0); 
  } else if (IPLANTA == 2) {
    MYSERVO.write(90); 
  } else if (IPLANTA == 3) {
    MYSERVO.write(180); 
  } 
}

void cambiarColorLed(String SCOLOR) {
  if (SCOLOR == "ROJO") {
    digitalWrite(LED_ROJO, HIGH);
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_AZUL, LOW); 
  } else if (SCOLOR == "VERDE") {
    digitalWrite(LED_ROJO, LOW);
    digitalWrite(LED_VERDE, HIGH);
    digitalWrite(LED_AZUL, LOW);
  } else if (SCOLOR == "AZUL") {
    digitalWrite(LED_ROJO, LOW);
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_AZUL, HIGH); 
  } else if (SCOLOR == "BLANCO") {
    digitalWrite(LED_ROJO, LOW);
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_AZUL, LOW); 
  } 
}

