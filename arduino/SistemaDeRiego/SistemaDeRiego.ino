#include <SimpleDHT.h>

//----------------------------------- Asociacion las salidas correspondiente.
// Analogicas
#define MEDIDOR_NIVEL_AGUA A0
#define FOTOCELDA A1
#define SENSOR_SUELO_1 A2
#define SENSOR_SUELO_2 A3
#define SENSOR_SUELO_3 A4

//Digitales
#define MEDIDOR_hUMEDAD_TEMP 2

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

//Valores para riego
int NIVEL_AGUA_MIN = 0;
int CLARIDAD_MIN = 0;
int CLARIDAD_MAX = 0;
int TEMPERATURA_MIN = 0;
int TEMPERATURA_MAX = 0;
int HUMEDAD_MIN_PLANTA_1 = 0;
int HUMEDAD_MIN_PLANTA_2 = 0;
int HUMEDAD_MIN_PLANTA_3 = 0;

// Crear Obj
SimpleDHT11 DHT11;

void setup(){
  Serial.begin(9600);
  
  pinMode(FOTOCELDA,INPUT); 
}

void loop(){
  obtenerVariablesRiego();
  obtenerOtros();
  obtenerValoresPlantas();
  analisisDeRiego();
}

void obtenerOtros(){
  obtener_Nivel_Del_Agua();
  delay(100);
  obtener_Humedad_Temperatura();
  delay(100);
  obtener_Claridad();
}

void obtener_Nivel_Del_Agua (){
  NIVEL_AGUA = analogRead(MEDIDOR_NIVEL_AGUA);

  Serial.println("#0#"+(String((NIVEL_AGUA))));
}

void obtener_Humedad_Temperatura () {
  byte DATA[40] = {0};
  if (DHT11.read(MEDIDOR_hUMEDAD_TEMP, &VALOR_TEMPERATURA, &VALOR_HUMEDAD, DATA)) {
      Serial.println("Error");
    return;
  }
  Serial.println("#5#"+(String((int)VALOR_HUMEDAD)));
  delay(100);
  Serial.println("#6#"+(String((int)VALOR_TEMPERATURA)));
}

void obtener_Claridad (){
  VALOR_CLARIDAD = analogRead(FOTOCELDA);
  Serial.println("#1#"+(String(VALOR_CLARIDAD)));
}

void obtenerValoresPlantas(){
  obtenerHumedadSuelo(1);
  delay(100);
  obtenerHumedadSuelo(2);
  delay(100);
  obtenerHumedadSuelo(3);
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

void analisisDeRiego(){
  // Condiciones de riego 
  // Si el recipiente tiene agua
  // Si la iluminacion es inferior al 30% (Valores de % a %)
  // Si la temperatura es inferior al 30% (Valores de % a %)
  // Si la humedad en el suelo es igual o inferior al valor que se asigna a cada maceta 

  if (NIVEL_AGUA > NIVEL_AGUA_MIN) { 
    if ((VALOR_CLARIDAD > CLARIDAD_MIN) and (VALOR_CLARIDAD < CLARIDAD_MAX)) {
      if ((VALOR_TEMPERATURA > TEMPERATURA_MIN) and (VALOR_TEMPERATURA < TEMPERATURA_MAX)) {
        if (HUMEDADA_FINAL_1 < HUMEDAD_MIN_PLANTA_1) { regarPlanta(1); }
        if (HUMEDADA_FINAL_2 < HUMEDAD_MIN_PLANTA_2) { regarPlanta(2); }
        if (HUMEDADA_FINAL_3 < HUMEDAD_MIN_PLANTA_3) { regarPlanta(3); }
      }
    }
  }
}

void obtenerVariablesRiego(){

  char cDatosTemp = Serial.read();
  String sDatosTemp = String(cDatosTemp);
  String sDatosPrefijo = sDatosTemp.substring(0, 3);
  int iLargoDatos = sDatosTemp.length();
  String sDatosFinal = sDatosTemp.substring(3, iLargoDatos);

  if (sDatosPrefijo == "#0#") { NIVEL_AGUA_MIN = sDatosFinal.toInt(); }
  if (sDatosPrefijo == "#1#") { CLARIDAD_MIN = sDatosFinal.toInt(); }
  if (sDatosPrefijo == "#2#") { CLARIDAD_MAX = sDatosFinal.toInt(); }
  if (sDatosPrefijo == "#3#") { TEMPERATURA_MIN = sDatosFinal.toInt(); }
  if (sDatosPrefijo == "#4#") { TEMPERATURA_MAX = sDatosFinal.toInt(); }
  if (sDatosPrefijo == "#5#") { HUMEDAD_MIN_PLANTA_1 = sDatosFinal.toInt(); }
  if (sDatosPrefijo == "#6#") { HUMEDAD_MIN_PLANTA_2 = sDatosFinal.toInt(); }
  if (sDatosPrefijo == "#7#") { HUMEDAD_MIN_PLANTA_3 =  sDatosFinal.toInt(); }

  Serial.println("#98#Se actualizan las variables para riego : "+ cDatosTemp);
}


void regarPlanta(int IPLANTA){
 

  Serial.println("#99#Regando planta nº "+(String((IPLANTA))));
}

