alert("hola");
console.log("hola");

/*1 - Petición AJAX y procesamiento de respuesta XML (5 ptos.)
El objetivo de esta actividad es a enviar peticiones AJAX y procesar la respuesta recibida
en formato XML.
A partir del fichero de datos siguiente se pide que se implemente una aplicación que lo
lea y lo procese para añadir una tabla con esta información en su página web. No debéis
preocuparos por el estilo porque vendrá dado por la página donde se incrustará. Se puede
añadir la tabla directamente al cuerpo del documento HTML (document.body).*/

function traer1() {
  const xmlhttp = new XMLHttpRequest();
  const url = "http://localhost/ajax/alumnos.xml";

  //funcion que permita mapear el estado de la solicitud
  xmlhttp.onreadystatechange = function () {
    //Si es exitosa
    if (this.readyState == 4 && this.status == 200) {
      crarTabla1(this);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
function crarTabla1(xml) {
  //console.log(xml);
  var i;
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("alumno");
  var name, apellido, nota, convocatoria;
  var table = document.createElement("table");
  var tbody = document.createElement("tboby");

  //Crear header
  var row1 = document.createElement("tr");
  var td1 = document.createElement("td");
  td1.appendChild(document.createTextNode("Nombre"));
  var td2 = document.createElement("td");
  td2.appendChild(document.createTextNode("Apellido"));
  var td3 = document.createElement("td");
  td3.appendChild(document.createTextNode("Nota"));
  var td4 = document.createElement("td");
  td4.appendChild(document.createTextNode("Convocatoria"));

  row1.appendChild(td1);
  row1.appendChild(td2);
  row1.appendChild(td3);
  row1.appendChild(td4);
  table.appendChild(row1);
  //console.log(table);

  //Crear body
  for (i = 0; i < x.length; i++) {
    var row = document.createElement("tr");
    name = x[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
    apellido = x[i].getElementsByTagName("apellido")[0].childNodes[0].nodeValue;
    nota = x[i].getElementsByTagName("nota")[0].childNodes[0].nodeValue;
    convocatoria = x[i]
      .getElementsByTagName("nota")[0]
      .getAttribute("convocatoria");

    //console.log(convocatoria);

    var cell1 = document.createElement("td");
    var txtCell1 = document.createTextNode(name);
    cell1.appendChild(txtCell1);
    row.appendChild(cell1);

    var cell2 = document.createElement("td");
    var txtCell2 = document.createTextNode(apellido);
    cell2.appendChild(txtCell2);
    row.appendChild(cell2);

    var cell3 = document.createElement("td");
    var txtCell3 = document.createTextNode(nota);
    cell3.appendChild(txtCell3);
    row.appendChild(cell3);

    var cell4 = document.createElement("td");
    var txtCell4 = document.createTextNode(convocatoria);
    cell4.appendChild(txtCell4);
    row.appendChild(cell4);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  document.getElementById("tablaAlumnos").appendChild(table);
}

/*2 - Petición AJAX y procesamiento de respuesta HTML (5 ptos.)
El objetivo de esta actividad es aprender a enviar peticiones AJAX y procesar la respuesta
recibida en formato HTML.
Os piden crear una función que permita cargar un fragmento de código HTML, que será
generado en el servidor utilizando una plantilla mediante AJAX, y que el incrustado en el
cuerpo de la página. */

function traer2() {
  //var alums = [];
  fetch("http://localhost/ajax/json2.json")
    .then(function (response) {
      if (response.ok) {
        //return un 200
        return response.json();
      } else {
        throw "Error en la llamada"; // un 404 y lo envio al catch
      }
    })

    //.then(alumnos => alumnos.json())
    //El json se almacena en alumnos como un array
    .then(alumnos => {
      //console.log(alumnos);
      //el array lo mando a la funcion tabla
      tabla2(alumnos);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//funcion para introducir los datos del json en la tabla
function tabla2(alumnos) {
  var contenido = document.getElementById("mostrarAlumnos");
  contenido.innerHTML = "";
  //console.log(alumnos);
  for (let valor of alumnos) {
    //console.log(valor.nombre);
    //comillas especiales para agregar contenido html ``
    //${} para meter contenido json
    contenido.innerHTML += `
      <tr>
        <td> ${valor.nombre}</td>
        <td> ${valor.apellido}</td>
        <td> ${valor.nota.text}</td>
        <td> ${valor.nota.convocatoria}</td>
      </tr>
    `;
  }
}

/**********************************NOTAS****************************************************/
/**/
