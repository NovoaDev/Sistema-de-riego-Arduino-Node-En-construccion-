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
#define RELE_BOMBA_1 3
#define RELE_BOMBA_2 4
#define RELE_BOMBA_3 5
#define RELE_INTERRUPTOR_LUZ 6

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

  pinMode(RELE_BOMBA_1, OUTPUT);
  pinMode(RELE_BOMBA_2, OUTPUT);
  pinMode(RELE_BOMBA_3, OUTPUT);
  pinMode(RELE_INTERRUPTOR_LUZ, OUTPUT);
   
  pinMode(FOTOCELDA,INPUT); 
  
  // Estado inicial: Todos los reles a 0
  digitalWrite(RELE_BOMBA_1, HIGH);
  digitalWrite(RELE_BOMBA_2, HIGH);
  digitalWrite(RELE_BOMBA_3, HIGH);
  digitalWrite(RELE_INTERRUPTOR_LUZ, HIGH);

  // Peticion de envio de correo cuando se reinicia el arduino 
  Serial.println("#98#True");
  // Peticion de envio desde la db de configuracion 
  Serial.println("#99#True");
}

void loop(){
  // Read serial input:
  if (Serial.available()) {
  
    String inString =  Serial.readStringUntil('\n'); 
    String sDatosPrefijo = inString.substring(0, 3);
    int iLargoDatos = inString.length();
    String sDatosFinal = inString.substring(3, iLargoDatos);
  
    if (sDatosPrefijo == "#0#") { 
      NIVEL_AGUA_MIN = sDatosFinal.toInt();
      Serial.println("#20#"+String(NIVEL_AGUA_MIN));
    }
    if (sDatosPrefijo == "#1#") { 
      CLARIDAD_MIN = sDatosFinal.toInt(); 
      Serial.println("#21#"+String(CLARIDAD_MIN));
    }
    if (sDatosPrefijo == "#2#") { 
      CLARIDAD_MAX = sDatosFinal.toInt(); 
      Serial.println("#22#"+String(CLARIDAD_MAX));
    }
    if (sDatosPrefijo == "#3#") { 
      TEMPERATURA_MIN = sDatosFinal.toInt(); 
      Serial.println("#23#"+String(TEMPERATURA_MIN));
    }
    if (sDatosPrefijo == "#4#") { 
      TEMPERATURA_MAX = sDatosFinal.toInt(); 
      Serial.println("#24#"+String(TEMPERATURA_MAX));
    }
    if (sDatosPrefijo == "#5#") { 
      HUMEDAD_MIN_PLANTA_1 = sDatosFinal.toInt(); 
      Serial.println("#25#"+String(HUMEDAD_MIN_PLANTA_1));
    }
    if (sDatosPrefijo == "#6#") { 
      HUMEDAD_MIN_PLANTA_2 = sDatosFinal.toInt(); 
      Serial.println("#26#"+String(HUMEDAD_MIN_PLANTA_2));
    }
    if (sDatosPrefijo == "#7#") { 
      HUMEDAD_MIN_PLANTA_3 = sDatosFinal.toInt();
      Serial.println("#27#"+String(HUMEDAD_MIN_PLANTA_3));
    }

    //Ordenes directas de node a arduino
    if (sDatosPrefijo == "#8#") { 
      if(sDatosFinal.toInt() == 1){ regarPlanta(1); }
      if(sDatosFinal.toInt() == 2){ regarPlanta(2); }
      if(sDatosFinal.toInt() == 3){ regarPlanta(3); }
      if(sDatosFinal.toInt() == 4){ enciendeApagaLuz(0); }
      if(sDatosFinal.toInt() == 5){ enciendeApagaLuz(1); }
    }    
    //Consulta de datos variables para riego arduino
    if (sDatosPrefijo == "#9#") { 
      Serial.println("#80#"+String(NIVEL_AGUA_MIN));
      Serial.println("#81#"+String(CLARIDAD_MIN));
      Serial.println("#82#"+String(CLARIDAD_MAX));
      Serial.println("#83#"+String(TEMPERATURA_MIN));
      Serial.println("#84#"+String(TEMPERATURA_MAX));
      Serial.println("#85#"+String(HUMEDAD_MIN_PLANTA_1));
      Serial.println("#86#"+String(HUMEDAD_MIN_PLANTA_2));
      Serial.println("#87#"+String(HUMEDAD_MIN_PLANTA_3));
    }
  }
   
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
  if (NIVEL_AGUA < NIVEL_AGUA_MIN){
    Serial.println("#10#Nivel agua Critico")
  }
  Serial.println("#00#"+(String((NIVEL_AGUA))));
}

void obtener_Humedad_Temperatura () {
  byte DATA[40] = {0};
  if (DHT11.read(MEDIDOR_hUMEDAD_TEMP, &VALOR_TEMPERATURA, &VALOR_HUMEDAD, DATA)) {
      Serial.println("Error");
    return;
  }

  if (((int)VALOR_HUMEDAD) < 10) or ((int)VALOR_HUMEDAD) > 90)){ 
    Serial.println("#11#Niveleles de humedad Criticos")
  }
  if (((int)VALOR_TEMPERATURA) < 10) or ((int)VALOR_TEMPERATURA) > 40)){ 
    Serial.println("#12#Niveleles de temperatura Criticos")
  }
  
  Serial.println("#05#"+(String((int)VALOR_HUMEDAD)));
  delay(100);
  Serial.println("#06#"+(String((int)VALOR_TEMPERATURA)));
}

void obtener_Claridad (){
  VALOR_CLARIDAD = analogRead(FOTOCELDA);
  Serial.println("#01#"+(String(VALOR_CLARIDAD)));
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
    Serial.println("#02#"+(String((HUMEDADA_FINAL_1))));
  } else if (IPLANTA == 2) {
    HUMEDADA_FINAL_2 = 0; 
    HUMEDADA_TEMP = map(analogRead(SENSOR_SUELO_2), 0, 1023, 100, 0);
    HUMEDADA_FINAL_2 = constrain (HUMEDADA_TEMP, 0, 100);
    Serial.println("#03#"+(String((HUMEDADA_FINAL_2))));
  } else if (IPLANTA == 3) {
    HUMEDADA_FINAL_3 = 0; 
    HUMEDADA_TEMP = map(analogRead(SENSOR_SUELO_3), 0, 1023, 100, 0);
    HUMEDADA_FINAL_3 = constrain (HUMEDADA_TEMP, 0, 100);   
    Serial.println("#04#"+(String((HUMEDADA_FINAL_3)))); 
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
        if ((HUMEDADA_FINAL_1 < HUMEDAD_MIN_PLANTA_1) and (HUMEDADA_FINAL_1 < 90) and (HUMEDADA_FINAL_1 > 1)) { regarPlanta(1); }
        if ((HUMEDADA_FINAL_2 < HUMEDAD_MIN_PLANTA_2) and (HUMEDADA_FINAL_2 < 90) and (HUMEDADA_FINAL_2 > 1)) { regarPlanta(2); }
        if ((HUMEDADA_FINAL_3 < HUMEDAD_MIN_PLANTA_3) and (HUMEDADA_FINAL_3 < 90) and (HUMEDADA_FINAL_3 > 1)) { regarPlanta(3); }
      }
    }
  }
}


void regarPlanta(int IPLANTA){

  if(IPLANTA == 1) {
    digitalWrite(RELE_BOMBA_1, LOW);
    delay(2000);
    digitalWrite(RELE_BOMBA_1, HIGH);
  }
  
  if(IPLANTA == 2) {
    digitalWrite(RELE_BOMBA_2, LOW);
    delay(2000);
    digitalWrite(RELE_BOMBA_2, HIGH);
  }

  if(IPLANTA == 3) {
    digitalWrite(RELE_BOMBA_3, LOW);
    delay(2000);
    digitalWrite(RELE_BOMBA_3, HIGH);
  }

  Serial.println("#09#Regando planta nº "+(String((IPLANTA))));
}

void enciendeApagaLuz(int iOrden){

  if(iOrden == 0) {
    digitalWrite(RELE_INTERRUPTOR_LUZ, HIGH);
    Serial.println("#08#Luz apagada");
  }
  
  if(iOrden == 1) {
    digitalWrite(RELE_INTERRUPTOR_LUZ, LOW);
    Serial.println("#08#Luz encendida");
  }

}
