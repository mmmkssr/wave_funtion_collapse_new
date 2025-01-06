const celdas = []; // 4x4
let RETICULA = document.getElementById("cellSize").value; // número de lados, puede variar
let ancho; // altura de celda
let alto; // anchura de celda
const startButton = document.getElementById("start");

const azulejos = [];

let opcionesI = [];

const reglas = [
  // reglas de los bordes de cada azulejo
  {
    //tile 0
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 1
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 2
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 3
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 4
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 5
    UP: 0,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 0,
  },

  {
    //tile 6
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },

  {
    //tile 7
    UP: 0,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 8
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },

  {
    //tile 9
    UP: 0,
    RIGHT: 0,
    DOWN: 3,
    LEFT: 0,
  },

  {
    //tile 10
    UP: 0,
    RIGHT: 0,
    DOWN: 3,
    LEFT: 0,
  },

  {
    //tile 11
    UP: 0,
    RIGHT: 0,
    DOWN: 2,
    LEFT: 0,
  },

  {
    //tile 12
    UP: 3,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 13
    UP: 3,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 14
    UP: 2,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 15
    UP: 0,
    RIGHT: 0,
    DOWN: 4,
    LEFT: 0,
  },

  {
    //tile 16
    UP: 3,
    RIGHT: 0,
    DOWN: 2,
    LEFT: 0,
  },

  {
    //tile 17
    UP: 3,
    RIGHT: 0,
    DOWN: 2,
    LEFT: 0,
  },

  {
    //tile 18
    UP: 4,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 19
    UP: 0,
    RIGHT: 5,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 20
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 5,
  },

  {
    //tile 21
    UP: 0,
    RIGHT: 5,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 22
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 5,
  },

  {
    //tile 23
    UP: 2,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 24
    UP: 0,
    RIGHT: 5,
    DOWN: 0,
    LEFT: 1,
  },

  {
    //tile 25
    UP: 0,
    RIGHT: 5,
    DOWN: 0,
    LEFT: 1,
  },

  {
    //tile 26
    UP: 3,
    RIGHT: 6,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 27
    UP: 0,
    RIGHT: 6,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 28
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 6,
  },

  {
    //tile 29
    UP: 0,
    RIGHT: 5,
    DOWN: 0,
    LEFT: 6,
  },

  {
    //tile 30
    UP: 0,
    RIGHT: 7,
    DOWN: 0,
    LEFT: 0,
  },

  {
    //tile 31
    UP: 0,
    RIGHT: 6,
    DOWN: 0,
    LEFT: 7,
  },

  {
    //tile 32
    UP: 0,
    RIGHT: 7,
    DOWN: 0,
    LEFT: 6,
  },

  {
    //tile 33
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 6,
  },

  {
    //tile 34
    UP: 0,
    RIGHT: 0,
    DOWN: 2,
    LEFT: 6,
  },
];

const NA = reglas.length; // número de azulejos

function preload() {
  for (let i = 0; i < NA; i++) {
    //azulejos[i] = loadImage(`azulejos/tile${i}.png`); // otra forma de cargar las imágenes
    azulejos[i] = loadImage("azulejos/tile" + i + ".png");
  }
}

function setup() {
  createCanvas(1080, 1080);
  //createCanvas(windowWidth, windowHeight);

  ancho = width / RETICULA;
  alto = height / RETICULA;

  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULA * RETICULA; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }

  startButton.addEventListener("click", resetAll); //Establece una acción que ejecuta una función
}

function draw() {
  //Otras formas de escribir la función

  //Forma1
  //function filtrarCeldas(celda){
  //return celda.colapsada == false;
  //}
  //const celdasActuales = celdas.filter(filtrarCeldas);

  //Forma2
  //const celdasActuales = celdas.filter (function (celda){
  //return celda.colapsada == false; //ingresa la función de forma anónima
  //});

  const celdasConOpciones = celdas.filter((celda) => {
    return celda.opciones.length > 0;
  });

  //Forma3
  const celdasDisponibles = celdasConOpciones.filter((celda) => {
    return celda.colapsada == false;
  }); //recibe el valor y lo compara

  if (celdasDisponibles.length > 0) {
    celdasDisponibles.sort((a, b) => {
      return a.opciones.length - b.opciones.length;
    });
    const celdasPorColapsar = celdasDisponibles.filter((celda) => {
      return celda.opciones.length == celdasDisponibles[0].opciones.length;
    });

    const celdaSeleccionada = random(celdasPorColapsar);
    celdaSeleccionada.colapsada = true;

    const opcionSeleccionada = random(celdaSeleccionada.opciones);
    celdaSeleccionada.opciones = [opcionSeleccionada];

    //print(celdaSeleccionada);

    for (let x = 0; x < RETICULA; x++) {
      for (let y = 0; y < RETICULA; y++) {
        const celdaIndex = x + y * RETICULA;
        const celdaActual = celdas[celdaIndex];

        if (celdaActual.opciones.length < 1) {
          fill(255, 100, 100);
          rect(x * ancho, y * alto, ancho, alto);
        }

        if (celdaActual.colapsada) {
          const indiceDeAzulejos = celdaActual.opciones[0];
          const reglasActuales = reglas[indiceDeAzulejos];
          //print(reglasActuales);
          image(azulejos[indiceDeAzulejos], x * ancho, y * alto, ancho, alto);

          // Monitorear entropía UP
          if (y > 0) {
            const indiceUP = x + (y - 1) * RETICULA; // Generar un índice
            const celdaUP = celdas[indiceUP]; // Recuperar celda
            if (!celdaUP.colapsada) {
              cambiarEntropia(celdaUP, reglasActuales["UP"], "DOWN");
            }

            // Monitorear entropía RIGHT
            if (x < RETICULA - 1) {
              const indiceRIGHT = x + 1 + y * RETICULA; // Generar un índice
              const celdaRIGHT = celdas[indiceRIGHT]; // Recuperar celda
              if (!celdaRIGHT.colapsada) {
                cambiarEntropia(celdaRIGHT, reglasActuales["RIGHT"], "LEFT");
              }
            }

            // Monitorear entropía DOWN
            if (y < RETICULA - 1) {
              const indiceDOWN = x + (y + 1) * RETICULA; // Generar un índice
              const celdaDOWN = celdas[indiceDOWN]; // Recuperar celda
              if (!celdaDOWN.colapsada) {
                cambiarEntropia(celdaDOWN, reglasActuales["DOWN"], "UP");
              }
            }

            // Monitorear entropía LEFT
            if (x > 0) {
              const indiceLEFT = x - 1 + y * RETICULA; // Generar un índice
              const celdaLEFT = celdas[indiceLEFT]; // Recuperar celda
              if (!celdaLEFT.colapsada) {
                cambiarEntropia(celdaLEFT, reglasActuales["LEFT"], "RIGHT");
              }
            }
          } else {
            //strokeWeight(5);
            //rect(x * ancho, y * alto, ancho, alto);
          }
        }
      }
      //noLoop();
    }
  } else {
  }

  function cambiarEntropia(_celda, _regla, _opuesta) {
    const nuevasOpciones = [];
    for (let i = 0; i < _celda.opciones.length; i++) {
      if (_regla == reglas[_celda.opciones[i]][_opuesta]) {
        const celdaCompatible = _celda.opciones[i];
        nuevasOpciones.push(celdaCompatible);
      }
    }
    _celda.opciones = nuevasOpciones;
    print(nuevasOpciones);
  }
}

function resetAll() {
  //console.log("resetAll función ejecutada");
  RETICULA = document.getElementById("cellSize").value;
  ancho = width / RETICULA;
  alto = height / RETICULA;
  background(190);

  let opcionesI = [];
  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }
  for (let i = 0; i < RETICULA * RETICULA; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }
}
