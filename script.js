let arrayConversacion = [];

function scripEncriptar() { // reproduce el video, genera el encriptado con un delay de 4s
  reproducirVideo();
  setTimeout(function () {
    let inputTexto = document.getElementById("inputTexto").value.toLowerCase(); //toma el valor de input en minuscula
    arrayConversacion.push("normal", inputTexto); // guarda la conversacion
    document.getElementById("encriptadoTexto").value = encriptar(inputTexto); // llama la funcion encriptar y devuelve el valor encriptado en el textear encriptado
    document.getElementById("inputTexto").value = ""; // borra el contenido del inputTexto
  }, 4000); // tiempo de delay
}

function scripDesencriptar() { // reproduce el video, genera el desencriptado con un delay de 4s
  reproducirVideo();
  setTimeout(function () {
    let encriptado = document.getElementById("encriptadoTexto").value.toLowerCase(); //toma el valor de input en minuscula
    arrayConversacion.push("encriptado", encriptado); // guarda la conversacion
    document.getElementById("inputTexto").value = desencriptar(encriptado);  // llama la funcion desencriptar y devuelve el valor encriptado en el textear encriptado
    document.getElementById("encriptadoTexto").value = ""; // borra el contenido del input encriptadoTexto
  }, 4000); // tiempo de delay
}

//funcion para cargar los mensajes
function conversacion() {
  var lista = document.getElementById('miLista'); // selecciono la lista

  // Eliminar todos los elementos de la lista
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  // Recorrer el array y agregar elementos a la lista
  for (var i = 0; i < arrayConversacion.length; i += 2) {
    var tipo = arrayConversacion[i];
    var texto = arrayConversacion[i + 1];

    var li = document.createElement('li'); // Crear un elemento de lista

    li.textContent = texto;

    // Aplicar formato condicional al texto según el tipo
    if (tipo === 'normal') {
      li.style.padding = '5px'; // Ajusta el valor según sea necesario *NO FUNCIONA
      li.style.backgroundColor = '#00FF0080'; // Blackground
      li.style.color = 'white'; // color de texto
    } else if (tipo === 'encriptado') {
      li.style.padding = '5px'; // Ajusta el valor según sea necesario
      li.style.backgroundColor = '#0000FF80';
      li.style.color = 'black';
    }

    // Agregar el elemento a la lista
    lista.appendChild(li);

    // Crear un nuevo botón para copiar la celda
    var botonCopiarCelda = document.createElement("button");
    botonCopiarCelda.appendChild(document.createTextNode("Copiar texto"));

    // Asignar un evento al botón para copiar el texto del elemento
    botonCopiarCelda.addEventListener("click", function () {
      copiarTextoAlPortapapeles(texto);
    });

    // Agregar el botón al elemento de lista
    li.appendChild(botonCopiarCelda);

  }

  function copiarTextoAlPortapapeles(textoCopiar) {
    // Copiar el contenido del elemento a un portapapeles 
    navigator.clipboard.writeText(textoCopiar).then(function () {
      alert("Texto copiado: " + textoCopiar);
    }).catch(function (err) {
      console.error("Error al copiar texto: ", err);
    });
  }
}


function encriptar(texto) {
  return texto
    .replace(/e/gi, "enter")
    .replace(/i/gi, "imes")
    .replace(/a/gi, "ai")
    .replace(/o/gi, "ober")
    .replace(/u/gi, "ufat");
}

function desencriptar(texto) {
  return texto
    .replace(/enter/gi, "e")
    .replace(/imes/gi, "i")
    .replace(/ai/gi, "a")
    .replace(/ober/gi, "o")
    .replace(/ufat/gi, "u");
}

function reproducirVideo() {
  let video = document.getElementById("video-background");
  if (video.paused) {
    video.play();
  }
}

