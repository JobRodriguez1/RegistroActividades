let contadorActividades = 1;

function Agregar() {
    var actividad = document.getElementsByName('inActividad')[0].value;

    if (actividad.trim() !== "") {
        const element = document.getElementById("actividades");

        const checkboxId = 'check' + contadorActividades;
        const enlaceId = contadorActividades;
        contadorActividades++;

        let listaActividades = "";
        listaActividades += "<tr>";
        listaActividades += "<th>";
        listaActividades += "<div class='form-check text-center align-items-center d-flex' >";
        listaActividades += "<input class='form-check-input custom-checkbox'  type='checkbox' onchange='tareaTerminada(" + enlaceId + "," + checkboxId + ")' value='' id='" + checkboxId + "'>";
        listaActividades += "</div>";
        listaActividades += "</th>";
        listaActividades += "<td><button  onclick='ActualizarElemento(" + enlaceId + ")' id='" + enlaceId + "' class='list-group-item list-group-item-action' value='" + actividad + "'>" + actividad + " </button></td>";
        listaActividades += "</tr>";

        // Agrega el nuevo elemento al final de la tabla
        element.innerHTML += listaActividades;
        $.ajax({
            url: '/registrarLog',  // Actualiza la URL según tu configuración en urls.py
            type: 'GET',
            data: {
                accion: 'Tarea ' + actividad + ' agregada'
            },
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.error('Error al registrar la acción:', error);
            }
        });
        document.getElementsByName('inActividad')[0].value = "";
    }
}

function ActualizarElemento(id) {
    valorlista = document.getElementById(id);
    document.getElementById('editarActividad').value = valorlista.value;
    document.getElementById('Editar').style.display = "block";
    const element = document.getElementById("botonEditar");
    element.innerHTML = '<button type="button" class="btn btn-primary mb-3" onclick="Actualizar(' + id + ')">Editar</button>';
    $.ajax({
        url: '/registrarLog',  // Actualiza la URL según tu configuración en urls.py
        type: 'GET',
        data: {
            accion: 'Tarea ' + valorlista.value + ' seleccionada para editar'
        },
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error('Error al registrar la acción:', error);
        }
    });
}
function tareaTerminada(id, checkboxId) {
    boton = document.getElementById(id);
    tarea = document.getElementById(id);
    if (checkboxId.checked) {
        boton.style = "background-color: gray"
        boton.disabled = true;
        $.ajax({
            url: '/registrarLog',  // Actualiza la URL según tu configuración en urls.py
            type: 'GET',
            data: {
                accion: 'Tarea ' + tarea.value + ' completada'
            },
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.error('Error al registrar la acción:', error);
            }
        });
    } else {
        boton.disabled = false;
        boton.style = "background-color: white"
        $.ajax({
            url: '/registrarLog',  // Actualiza la URL según tu configuración en urls.py
            type: 'GET',
            data: {
                accion: 'Tarea ' + tarea.value + ' desmarcada'
            },
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.error('Error al registrar la acción:', error);
            }
        });
    }
}
function Actualizar(id) {
    valorAnterior = document.getElementById(id);
    valorNuevo = document.getElementById("editarActividad");
    $.ajax({
        url: '/registrarLog',  // Actualiza la URL según tu configuración en urls.py
        type: 'GET',
        data: {
            accion: 'Tarea ' + valorAnterior.value + ' cambiada por: ' + valorNuevo.value
        },
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error('Error al registrar la acción:', error);
        }
    });
    valorAnterior.innerHTML = valorNuevo.value;
    valorAnterior.value = valorNuevo.value;
    document.getElementById('Editar').style.display = "none";

}
