//https://youtu.be/sAhPcuNv29E (para los frames los recorté y edité todos en una app de dibujo y animación)

let animacionBola = []; //1
let animacionExplosion = []; //2
let animacionEspera = []; //3
let imagenPiso;             

let frameBola, frameExplosion, frameEspera;

let estadoPersonaje;
let contadorGeneral;
let limiteTiempo = 44;

function preload() {
cargarImagenes(1, 13, animacionBola);     
  cargarImagenes(13, 22, animacionExplosion); 
cargarImagenes(22, 23, animacionEspera);    
  
  imagenPiso = loadImage("assets/pisosonic.png");
}

function setup() {
  createCanvas(800, 600); 
  frameRate(11);       
  imageMode(CENTER);

  reset();
}

function draw() {
background(25, 25, 35);

  let centroX = width / 2;
let centroY = height / 2;

  let desvioX = 0;
  if (estadoPersonaje == 1){
    if (frameExplosion == 0 || frameExplosion == 2 || frameExplosion == 4 || frameExplosion == 6 || frameExplosion == 8) {
      desvioX = -5; 
    } else {
      desvioX = 5;  
    }
  }

  switch (estadoPersonaje) {
    case 0:
      dibujarFrame(animacionBola, frameBola, centroX, centroY);
      frameBola++;
      
      if(frameBola >= animacionBola.length) {
        frameBola = 0;
        cambiarEstado(1);
      }
      break;
    case 1:
      dibujarFrame(animacionExplosion, frameExplosion, centroX + desvioX, centroY);
      frameExplosion++;

      if (frameExplosion >= animacionExplosion.length){
        frameExplosion = 0;
        cambiarEstado(2);
      }
      break;

    case 2: 
      dibujarFrame(animacionEspera, frameEspera, centroX, centroY);
      
      // retorno
      if (eventoCambiaEstado(contadorGeneral, limiteTiempo)) {
        reset(); 
      }
      break;
  }

  //piso
  if (estadoPersonaje != 2){
    if (imagenPiso){
      image(imagenPiso, centroX + desvioX, centroY, 2500, 600);
    }
  }

  contadorGeneral++;
}

function cargarImagenes(inicio, fin, arreglo) {
for (let i = inicio; i < fin; i++) {
  arreglo.push(loadImage("assets/sonic" + i + ".png"));
}
}

function dibujarFrame(arreglo, indice, x, y) {
  if (arreglo[indice]) {
    image(arreglo[indice], x, y, 800, 600);
  }
}

function eventoCambiaEstado(contador, limite) {
  let alcanzoLimite = contador > limite;
  return alcanzoLimite;
}
function cambiarEstado(nuevoEstado) {
  estadoPersonaje = nuevoEstado;
  contadorGeneral = 0;
}

function reset(){
  frameBola = frameExplosion = frameEspera = 0;
  estadoPersonaje = 0;
  contadorGeneral = 0;
}
