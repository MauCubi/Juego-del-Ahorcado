let finJuego = true;       

// Array con las letras posibles a presionar
const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 
'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Array que lleva el registro de letras presionadas
let letrasPresionadas;  

// Array de palabra a adivinar
let arrayString;

// Array donde almacena palabra ingresadas por usuario
let palabraEscrita = [];

// Array con lista de palabras preestablecidas
const listaPalabras = ['PERRO', 'GATO', 'AUTO', 'MONITOR', 'CASA', 'CONTROL', 'CURSO', 'SILLA', 'COMIDA'];

// Evento para controlar teclas presionadas dentro del body HTML
const cuerpo = document.getElementById('cuerpo');
cuerpo.addEventListener('keypress', verificarTecla);

// Configuracion de eventos a botones de pantalla tactil
const botones = document.getElementsByClassName('myButton');
for (let index = 0; index < botones.length; index++) {    
    botones[index].addEventListener('click', verificarTactil, false);    
}

const word = document.getElementById('word');
word.addEventListener('paste', e => e.preventDefault());



// Contador de intentos y limite (limite depende del muñeco)
let contador;
const limite = 9;

// Dibujar Canvas inicial
let canvas = document.getElementById("ahorcado");
let pincel = canvas.getContext('2d');
pincel.fillStyle = "black";
pincel.lineWidth = 3;
pincel.fillRect(0, 357, 294, 3);    



// Funcion para elegir palabra oculta
function nuevoJuego(){
    limpiar();
    document.getElementById('menu').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
    contador = 0;
    
    let area = document.getElementById('area-letras');
    let element;    
    palabraEscrita = [];
    letrasPresionadas = [];    
    let palabra = listaPalabras[Math.floor(Math.random()*listaPalabras.length)];    
    
    for (let i = 0; i < palabra.length; i++) {
        element = document.createElement("div");
        element.className = 'espacio-letra';
        element.setAttribute('id',`letra${i}`);
        area.appendChild(element);
        palabraEscrita.push('_');                       
        
    }           
            
    // Transformar palabra en un array
    arrayString = palabra.split("");
    finJuego = false; 
    
}

// Controla letra presionada se encuentra en la palabra
function verificarTecla(e){    
    if (!finJuego) {       
        
        if (alfabeto.includes(e.key.toUpperCase())) {                           
            if (!letrasPresionadas.includes(e.key.toUpperCase())) {
                letrasPresionadas.push(e.key.toUpperCase());

                if (arrayString.includes(e.key.toUpperCase())) {                                           
                    for (let i = 0; i < arrayString.length; i++) {
                        if (arrayString[i] == e.key.toUpperCase()) {
                            palabraEscrita[i] = e.key.toUpperCase();                            
                            document.getElementById(`letra${i}`).insertAdjacentHTML('beforeend', e.key.toUpperCase());                          
                            
                        }                 
                        
                    }
                    if (palabraEscrita.toString() == arrayString.toString() ) {
                        document.getElementById('area-mensaje').style.color = '#00b200';
                        document.getElementById('area-mensaje').innerHTML = 'Felicidades, has ganado';
                        finJuego = true;
                    }
                } else {                    
                    contador ++;
                    dibujar(contador);
                    document.getElementById('area-presionadas').innerHTML += e.key.toUpperCase() + ', ';
                    
                    if (contador == limite) {
                        document.getElementById('area-mensaje').style.color = 'red';
                        document.getElementById('area-mensaje').innerHTML = 'Lástima, has perdido';
                        finJuego = true;

                        for (let i = 0; i < palabraEscrita.length; i++) {
                            if (palabraEscrita[i] == '_') {                                                           
                                let letrita = document.getElementById(`letra${i}`);
                                letrita.insertAdjacentHTML('beforeend', arrayString[i]);
                                letrita.style.color = 'red';
                            }      
                        }
                }
                }
                
            }
            
        }

    }

}




// Controla letra presionada se encuentra en la palabra
function verificarTactil(e){    
    if (!finJuego) {       
        
        if (alfabeto.includes(e.currentTarget.value.toUpperCase())) {                           
            if (!letrasPresionadas.includes(e.currentTarget.value.toUpperCase())) {
                letrasPresionadas.push(e.currentTarget.value.toUpperCase());

                if (arrayString.includes(e.currentTarget.value.toUpperCase())) {                                           
                    for (let i = 0; i < arrayString.length; i++) {
                        if (arrayString[i] == e.currentTarget.value.toUpperCase()) {
                            palabraEscrita[i] = e.currentTarget.value.toUpperCase();                            
                            document.getElementById(`letra${i}`).insertAdjacentHTML('beforeend', e.currentTarget.value.toUpperCase());                          
                            
                        }                 
                        
                    }
                    if (palabraEscrita.toString() == arrayString.toString() ) {
                        document.getElementById('area-mensaje').style.color = '#00b200';
                        document.getElementById('area-mensaje').innerHTML = 'Felicidades, has ganado';
                        finJuego = true;
                    }
                } else {                    
                    contador ++;
                    dibujar(contador);
                    document.getElementById('area-presionadas').innerHTML += e.currentTarget.value.toUpperCase() + ', ';
                    
                    if (contador == limite) {
                        document.getElementById('area-mensaje').style.color = 'red';
                        document.getElementById('area-mensaje').innerHTML = 'Lástima, has perdido';
                        finJuego = true;

                        for (let i = 0; i < palabraEscrita.length; i++) {
                            if (palabraEscrita[i] == '_') {                                                           
                                let letrita = document.getElementById(`letra${i}`);
                                letrita.insertAdjacentHTML('beforeend', arrayString[i]);
                                letrita.style.color = 'red';
                            }      
                        }
                }
                }
                
            }
            
        }

    }

}


// Funcion que dibuja al ahorcado en caso de equivocarse
function dibujar( x ){
    switch (x) {
        case 1:
            // horca 1
            pincel.fillRect(50, 0, 3, 360);   
            break;
        case 2:
            // horca 2
            pincel.fillRect(50, 0, 150, 3); 
            break;
        case 3:
            // horca 3
            pincel.fillRect(200, 0, 3, 50);
            break;
        case 4:
            // Cabeza
            pincel.beginPath();    
            pincel.arc(200, 75, 25, 0, 2*3.14);
            pincel.stroke();
            break;
        case 5:
            // Cuerpo
            pincel.fillRect(200, 100, 3, 135);
            break;
        case 6:
            // Brazo 1
            pincel.beginPath();
            pincel.moveTo(201, 100);
            pincel.lineTo(250, 146);
            pincel.stroke();        
            break;
        case 7:
            // Brazo 2
            pincel.beginPath();
            pincel.moveTo(201, 100);
            pincel.lineTo(152, 146);
            pincel.stroke();        
            break;
        case 8:
            // Pierna 1
            pincel.beginPath();
            pincel.moveTo(201, 234);
            pincel.lineTo(250, 280);
            pincel.stroke();        
            break;
        case 9:
            // Pierna 2
            pincel.beginPath();
            pincel.moveTo(201, 234);
            pincel.lineTo(152, 280);
            pincel.stroke();        
            break;
    
        
    }
}


// Funcion para limpiar elementos en pantalla al iniciar un nuevo juego
function limpiar(){

    document.getElementById('area-presionadas').innerHTML = '';
    document.getElementById('area-mensaje').innerHTML = '';
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.fillRect(0, 357, 294, 3); 
    let cantidadElementos = document.getElementById('area-letras').getElementsByTagName('*').length;
    
    if (cantidadElementos > 0) {
        for (let i = 0; i < cantidadElementos; i++) {
            let element = document.getElementById(`letra${i}`);
            element.remove();        
        } 
    }

}

function volverMenu(){
    finJuego = true;
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('juego').style.display = 'none';
    document.getElementById('agregar-palabras').style.display = 'none';
}

function menuAgregarPalabra(){    
    document.getElementById('menu').style.display = 'none';    
    document.getElementById('agregar-palabras').style.display = 'flex';
    mostrarPalabrasAlmacenadas();
    word.focus();
    word.value = '';
}

function agregarPalabra(){
    if (word.value == '') {
        alert('Por favor ingrese una palabra');
    }else if(listaPalabras.includes(word.value.toUpperCase())){
        alert('La palabra ingresada ya se encuentra en la lista')
    }
    else{
        listaPalabras.push(word.value.toUpperCase());
        mostrarPalabrasAlmacenadas();
        word.value = '';
        word.focus();
    }
}

function mostrarPalabrasAlmacenadas(){
    document.getElementById('parrafo-palabras').innerHTML = '';
    for (let i = 0; i < listaPalabras.length; i++) {
        if (i == (listaPalabras.length - 1)) {
            document.getElementById('parrafo-palabras').innerHTML += listaPalabras[i];
        }else{
            document.getElementById('parrafo-palabras').innerHTML += listaPalabras[i] + ', ';
        }        
    }    
}

