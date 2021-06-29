console.log ("Consumo de Api con Java Script");


//definir las varialbes

var url = "http://localhost:5000/api/Estudiante";

document.getElementById("formularioUpdate").classList.add("apagarContenedor")



//-----------------------------------------------------------------------------  LISTAR REGISTROS  GET

const cargarDatos = (api) => {

    return fetch(api) 
        .then((response) => response.json())
        .then((json) => {
             // pasa algo
             imprimaDatos(json)
        })
        .catch((error) => {
            // pasa algo
              errorApi(error)
       })

}

const errorApi = (mensaje) =>{
    let html = "";
    html += "<div class='mensajeError'>";
    html += "<p>"+mensaje+"</p>";
    html += "</div>";
    document.getElementById("errorApi").innerHTML = html

}


const imprimaDatos = (datos) => {

    let html = "";

html += "<table>";
html += "<caption>Contenido Tabla Estudiantes</caption>";
html += "<tr>";
html += " <th>Codigo</th>";
html += " <th>Nombre</th>";
html += " <th>Correo</th>";
html += " <th>Nota 1</th>";
html += " <th>Nota 2</th>";
html += " <th>Nota 3</th>";
html += "<th></th>";
html += "<th></th>";
html += " <th></th>";
html += "</tr>";
// for each
datos.forEach(element => {
        html += "<tr>";
        html += " <td>"+ element.codigo+"</td>";
        html += " <td>"+ element.nombre+"</td>";
        html += " <td>"+ element.correo+"</td>";
        html += " <td>"+ element.nota1+"</td>";
        html += " <td>"+ element.nota2+"</td>";
        html += " <td>"+ element.nota3+"</td>";
        html += "<td>  <button class='btn detalle' id='btnDetalle' onclick='detalleUsuario("+element.codigo+")'>Detalle</button></td>";
        html += "<td>  <button class='btn actualizar' id='btnActualizar' onclick='actualizaRegistro("+element.codigo+")'>Actualiza</button></td>";
        html += "<td>  <button class='btn borrar' id='btnBorrar' onclick='borrarRegistro("+element.codigo+")'>Borrar</button></td>";
        html += "</tr>";
    
});
html += "</table>";

document.getElementById("contenidoApi").innerHTML = html;

}

//-----------------------------------------------------------------------------  DETALLE REGISTRO  GET + ID

const detalleUsuario = (userId) => {

    document.getElementById("formularioUpdate").classList.add("prenderContenedor")

    

    document.getElementById("contenedorBtnActualizar").classList.remove("prenderContenedor")
    document.getElementById("contenedorBtnActualizar").classList.add("apagarContenedor")

    document.getElementById("formularioRegistro").classList.remove("prenderContenedor")
    document.getElementById("formularioRegistro").classList.add("apagarContenedor")

    let api = url + "/" + userId

    return fetch(api) 
    .then((response) => response.json())
    .then((json) => {
         // pasa algo
         cargarFormulario(json)
    })
    .catch((error) => {
        // pasa algo
          errorApi(error)
   })

}




//-----------------------------------------------------------------------------  ACTUALIZAR REGISTRO PUT + ID
const actualizaRegistro = (userId) => {


    document.getElementById("contenedorBtnActualizar").classList.remove("apagarContenedor")
    document.getElementById("contenedorBtnActualizar").classList.add("prenderContenedor")


    document.getElementById("formularioUpdate").classList.add("prenderContenedor")

    document.getElementById("formularioRegistro").classList.remove("prenderContenedor")
    document.getElementById("formularioRegistro").classList.add("apagarContenedor")

    let api = url + "/" + userId

    return fetch(api) 
    .then((response) => response.json())
    .then((json) => {
         // pasa algo
         cargarFormulario(json)
    })
    .catch((error) => {
        // pasa algo
          errorApi(error)
   })

}

const cargarFormulario = (usuario) => {

    const codigoUp = document.getElementById("codigoUp").value = usuario.codigo
    const nombreUp = document.getElementById("nombreUp").value = usuario.nombre
    const correoUp = document.getElementById("correoUp").value = usuario.correo
    const nota1Up = document.getElementById("nota1Up").value = usuario.nota1
    const nota2Up = document.getElementById("nota2Up").value = usuario.nota2
    const nota3Up = document.getElementById("nota3Up").value = usuario.nota3

}


const formularioUpdate = document.getElementById("formularioUpdate")

formularioUpdate.addEventListener ('submit', (e) => {
    e.preventDefault();

    const codigoUp = document.getElementById("codigoUp")
    const nombreUp = document.getElementById("nombreUp")
    const correoUp = document.getElementById("correoUp")
    const nota1Up = document.getElementById("nota1Up")
    const nota2Up = document.getElementById("nota2Up")
    const nota3Up = document.getElementById("nota3Up")

    const nuevoEstudiante =   {
        "codigo": parseInt(codigoUp.value),
        "nombre": nombreUp.value,
        "correo": correoUp.value,
        "nota1": parseInt(nota1Up.value),
        "nota2": parseInt(nota2Up.value),
        "nota3": parseInt(nota3Up.value),
      }
      
      let api = url + "/" + parseInt(codigoUp.value) 
      return fetch(api , {
        body: JSON.stringify(nuevoEstudiante),
        method: 'PUT',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    }).then(response => {
        rtaPeticion(response, "ACTUALIZAR")
    }).catch(err => {
        console.log ("Error " + err )
    })


})


//-----------------------------------------------------------------------------  AGREGAR REGISTRO POST
const formularioRegistro = document.getElementById("formularioRegistro")

formularioRegistro.addEventListener ('submit', (e) => {
    e.preventDefault();
    const codigoIn = document.getElementById("codigoIn")
    const nombreIn = document.getElementById("nombreIn")
    const correoIn = document.getElementById("correoIn")
    const nota1In = document.getElementById("nota1In")
    const nota2In = document.getElementById("nota2In")
    const nota3In = document.getElementById("nota3In")

    const nuevoEstudiante =   {
        "codigo": parseInt(codigoIn.value),
        "nombre": nombreIn.value,
        "correo": correoIn.value,
        "nota1": parseInt(nota1In.value),
        "nota2": parseInt(nota2In.value),
        "nota3": parseInt(nota3In.value),
      }

      return fetch(url , {
        body: JSON.stringify(nuevoEstudiante),
        method: 'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    }).then(response => {
        rtaPeticion(response, "AGREGAR")
    }).catch(err => {
        console.log ("Error " + err )
    })


})



//-----------------------------------------------------------------------------  BORRAR REGISTRO

const borrarRegistro = (userID) => {

    let api = url + "/" + userID
    console.log ("Delete " + api)

    return fetch(api , {
        method: 'DELETE',
        mode:'cors',
    }).then(response => {
        rtaPeticion(response, "BORRAR")
    }).catch(err => {
        console.log ("Error " + err )
    })

}

//*********************************************************************************************+/

const  rtaPeticion = (data, metodo) => {
    console.log ("METODO "  + metodo );
    console.log ("RTA PETICION");
    console.log ("STATUS "  + data.status );
    console.log ("OK "  + data.ok );
    console.log ("STATUSTEXT "  + data.statusText);
    cargarDatos(url)
    if (!data.ok && metodo =="AGREGAR") 
      errorApi("El usuario ya existe en la bse de datos")
      else 
    document.getElementById("errorApi").classList.add("apagarContenedor")
    
}

//*********************************************************************************************+/

cargarDatos(url)









