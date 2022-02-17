document.addEventListener("DOMContentLoaded", function() {
	obtenerOfertas();
	$("#anadir").click(crearOferta);
});

const editar = document.querySelector('#actualizar');
const filtrarPorPriridad = document.querySelector('#filtrarPorPrioridad');
const actualizarOferta = document.querySelector('#actualizarOferta');

const obtenerOfertas = () => {
	fetch('/index', { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
		.then(response => {

			for (let oferta of response) {
				const tableBody = document.getElementById("tableBody");
				const tr = document.createElement('tr');

				if (oferta.prioridad == 'Baja') {
					tr.setAttribute("class", "table-active");
				}
				if (oferta.prioridad == 'Media') {
					tr.setAttribute("class", "table-warning");
				}
				if (oferta.prioridad == 'Alta') {
					tr.setAttribute("class", "table-danger");
				}


				let th = document.createElement('td');
				th.textContent = oferta.id_oferta;
				let tdNombre = document.createElement('td');
				tdNombre.textContent = oferta.nombre;
				let tdPrecio = document.createElement('td');
				tdPrecio.textContent = oferta.precio;


				let tdInfo = document.createElement('td');
				let botonInfo = document.createElement('button');
				let tdBorrar = document.createElement('td');
				let botonBorrar = document.createElement('button');

				botonInfo.textContent = 'Info';
				botonInfo.setAttribute('class', 'btn btn-info info');
				botonInfo.setAttribute('id', 'info');
				botonInfo.setAttribute('name', 'infoModal');
				botonInfo.setAttribute('type', 'button');
				botonInfo.addEventListener('click', () => {
					$("#modal").modal('show');
					mostrarModal(oferta.id_oferta);
				});
				$(".btn-close").on('click', function() {
					$("#modal").modal("hide");
				});
				$("#cerrar-modal").on('click', function() {
					$("#modal").modal("hide");
				});

				botonBorrar.textContent = 'Borrar';
				botonBorrar.setAttribute('class', 'btn btn-success borrar');
				botonBorrar.setAttribute('id', "borrar");
				botonBorrar.setAttribute('name', 'Borrar');
				botonBorrar.setAttribute('type', 'button');

				tr.appendChild(th);
				tr.appendChild(tdNombre);
				tr.appendChild(tdPrecio);
				tdInfo.appendChild(botonInfo);
				tdBorrar.appendChild(botonBorrar);
				tr.appendChild(tdInfo);

				tr.appendChild(tdBorrar);
				tableBody.appendChild(tr);
				borrarOferta(oferta.id_oferta);
			}
		});
}

const borrarOferta = (idOferta) => {
	const borrar = document.getElementsByName("Borrar");
	for (let item of borrar) {
		item.addEventListener('click', () => {
			item.closest('tr').remove();
			$.ajax({
				url: "/borrar/" + idOferta,
				contentType: "application/json; charset=utf-8",
				data: { "id": idOferta },
				type: "GET",
				success: function(response) {
					if (response == "false") {
						alerta('Error de borrado');
					}
				}
			});
		});
	}

}

const crearOferta = () => {
	if ($('#inputNombre').val() != "" && $('#selectProducto').val() != ""
		&& $('#inputPrecio').val() != "" && $('#inputEnlace').val() != ""
		&& $('#inputDescripcion').val() != "") {
		fetch('/crear', { headers: { "Content-Type": "application/json; charset=utf-8" },
			method: 'POST',
			body: JSON.stringify({
				nombre: $('#inputNombre').val(),
				prioridad: $('#selectProducto').val(),
				precio: $('#inputPrecio').val(),
				enlace: $('#inputEnlace').val(),
				descripcion: $('#inputDescripcion').val()
			})
				.then(function(response) {
					if (response.ok) {
						return response.json();
					} else {
						throw "La oferta ya existe";
					}
				})
				.then(response => {
                obtenerOfertas();
            })
		})
	};
}
const mostrarModal = (idOferta) => {

	fetch('/oferta/' + idOferta, { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
		.then(response => {

			let ModalBody = document.getElementsByClassName("modal-body")[0];
			ModalBody.replaceChildren();
			let ModalTitle = document.getElementsByClassName("modal-title")[0];
			ModalTitle.textContent = response.nombre;

			//Label e Input desactivado para el Id
			let labelId = document.createElement('label');
			labelId.textContent = 'Id: ';
			let inputId = document.createElement('input');
			inputId.setAttribute('type', 'text');
			inputId.setAttribute('id', 'inputDesactivadoId');
			inputId.setAttribute('name', 'inputDesactivados');
			inputId.setAttribute('disabled', 'disabled');
			inputId.setAttribute('placeholder', response.id_oferta);

			//Label e Input desactivado para el Nombre
			let labelNombre = document.createElement('label');
			labelNombre.textContent = 'Nombre: ';
			let inputNombre = document.createElement('input');
			inputNombre.setAttribute('type', 'text');
			inputNombre.setAttribute('id', 'inputDesactivadoNombre');
			inputNombre.setAttribute('name', 'inputDesactivados');
			inputNombre.setAttribute('disabled', 'disabled');
			inputNombre.setAttribute('placeholder', response.nombre);

			//Label e Input desactivado para Fecha de publicacion
			let labelFecha = document.createElement('label');
			labelFecha.textContent = 'Publicación: ';
			let inputFecha = document.createElement('p');
			//inputFecha.setAttribute('type', 'date');
			inputFecha.setAttribute('id', 'inputDesactivadoFecha');
			inputFecha.setAttribute('name', 'inputDesactivados');
			//inputFecha.setAttribute('disabled', 'disabled');
			inputFecha.innerText = response.fecha_Publicacion;
			//inputFecha.setAttribute('placeholder', response.fecha_Publicacion);

			//Label e Input desactivado para prioridad
			let labelPrioridad = document.createElement('label');
			labelPrioridad.setAttribute('for', 'selectProducto2');
			labelPrioridad.textContent = 'Selecciona Prioridad: ';
			let prio = response.prioridad;
			let selectPrioridad = document.createElement("select");
			selectPrioridad.setAttribute('disabled', 'disabled');
			selectPrioridad.setAttribute('id', 'inputDesactivadoPrioridad');
			selectPrioridad.setAttribute('name', 'inputDesactivados');
			let option1 = document.createElement("option");
			let option1Texto = document.createTextNode("Baja");
			option1.appendChild(option1Texto);
			let option2 = document.createElement("option");
			let option2Texto = document.createTextNode("Media");
			option2.appendChild(option2Texto);
			let option3 = document.createElement("option");
			let option3Texto = document.createTextNode("Alta");
			option3.appendChild(option3Texto);
			selectPrioridad.appendChild(option1);
			selectPrioridad.appendChild(option2);
			selectPrioridad.appendChild(option3);
			if (prio == 'Baja') {
				option1.setAttribute('selected', 'selected');
			} else if (prio == 'Media') {
				option2.setAttribute('selected', 'selected');
			} else {
				option3.setAttribute('selected', 'selected');
			}

			//Label e Input desactivado para el enlace
			let labelEnlace = document.createElement('label');
			labelEnlace.textContent = 'Enlace: ';
			let inputEnlace = document.createElement('input');
			inputEnlace.setAttribute('type', 'text');
			inputEnlace.setAttribute('id', 'inputDesactivadoEnlace');
			inputEnlace.setAttribute('name', 'inputDesactivados');
			inputEnlace.setAttribute('disabled', 'disabled');
			inputEnlace.setAttribute('placeholder', response.enlace);

			//Label e Input desactivado para la descripcion
			let labelDescripcion = document.createElement('label');
			labelDescripcion.textContent = 'Descripción: ';
			let inputDescripcion = document.createElement('input');
			inputDescripcion.setAttribute('type', 'text');
			inputDescripcion.setAttribute('id', 'inputDesactivadoDescripcion');
			inputDescripcion.setAttribute('name', 'inputDesactivados');
			inputDescripcion.setAttribute('disabled', 'disabled');
			inputDescripcion.setAttribute('placeholder', response.descripcion);

			//Label e Input desactivado para el precio
			let labelPrecio = document.createElement('label');
			labelPrecio.textContent = 'Precio: ';
			let inputPrecio = document.createElement('input');
			inputPrecio.setAttribute('type', 'text');
			inputPrecio.setAttribute('id', 'inputDesactivadoPrecio');
			inputPrecio.setAttribute('name', 'inputDesactivados');
			inputPrecio.setAttribute('disabled', 'disabled');
			inputPrecio.setAttribute('placeholder', response.precio);


			ModalBody.appendChild(labelId);
			ModalBody.appendChild(inputId);
			ModalBody.appendChild(document.createElement('br'));



			ModalBody.appendChild(labelNombre);
			ModalBody.appendChild(inputNombre);
			ModalBody.appendChild(document.createElement('br'));



			ModalBody.appendChild(labelFecha);
			ModalBody.appendChild(inputFecha);
			ModalBody.appendChild(document.createElement('br'));


			ModalBody.appendChild(labelPrioridad);
			ModalBody.appendChild(selectPrioridad);
			ModalBody.appendChild(document.createElement('br'));

			ModalBody.appendChild(labelEnlace);
			ModalBody.appendChild(inputEnlace);
			ModalBody.appendChild(document.createElement('br'));

			ModalBody.appendChild(labelDescripcion);
			ModalBody.appendChild(inputDescripcion);
			ModalBody.appendChild(document.createElement('br'));

			ModalBody.appendChild(labelPrecio);
			ModalBody.appendChild(inputPrecio);
			ModalBody.appendChild(document.createElement('br'));
		});

}

filtrarPorPriridad.addEventListener('click', () => {
	const tabla = document.querySelector('#tableBody');
	tabla.innerHTML = "";
	const prioridad = document.querySelector('input[name="optionsRadios"]:checked').value;
	fetch('/prioridad/' + prioridad, { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
		.then(response => {

			for (let oferta of response) {
				const tableBody = document.getElementById("tableBody");
				const tr = document.createElement('tr');

				if (oferta.prioridad == 'Baja') {
					tr.setAttribute("class", "table-active");
				}
				if (oferta.prioridad == 'Media') {
					tr.setAttribute("class", "table-warning");
				}
				if (oferta.prioridad == 'Alta') {
					tr.setAttribute("class", "table-danger");
				}


				let th = document.createElement('td');
				th.textContent = oferta.id_oferta;
				let tdNombre = document.createElement('td');
				tdNombre.textContent = oferta.nombre;
				let tdPrecio = document.createElement('td');
				tdPrecio.textContent = oferta.precio;


				let tdInfo = document.createElement('td');
				let botonInfo = document.createElement('button');
				let tdBorrar = document.createElement('td');
				let botonBorrar = document.createElement('button');

				botonInfo.textContent = 'Info';
				botonInfo.setAttribute('class', 'btn btn-info info');
				botonInfo.setAttribute('id', 'info');
				botonInfo.setAttribute('type', 'button');

				botonBorrar.textContent = 'Borrar';
				botonBorrar.setAttribute('class', 'btn btn-success borrar');
				botonBorrar.setAttribute('id', "borrar");
				botonBorrar.setAttribute('type', 'button');

				tr.appendChild(th);
				tr.appendChild(tdNombre);
				tr.appendChild(tdPrecio);
				tdInfo.appendChild(botonInfo);
				tdBorrar.appendChild(botonBorrar);
				tr.appendChild(tdInfo);
				tr.appendChild(tdBorrar);
				tableBody.appendChild(tr);
			}
		});
});

editar.addEventListener('click', () => {
	document.getElementById('inputDesactivadoNombre').disabled = false;
	document.getElementById('inputDesactivadoDescripcion').disabled = false;
	document.getElementById('inputDesactivadoPrioridad').disabled = false;
	document.getElementById('inputDesactivadoEnlace').disabled = false;
	document.getElementById('inputDesactivadoPrecio').disabled = false;
});

actualizarOferta.addEventListener('click', () => {
	fetch('/editarOferta', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			nombre: $('#inputDesactivadoNombre').val(),
			prioridad: $('#inputDesactivadoPrioridad').val(),
			precio: $('#inputDesactivadoPrecio').val(),
			hiperenlace: $('#inputDesactivadoEnlace').val(),
			descripcion: $('#inputDesactivadoDescripcion').val(),
		}).then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
				.then(function(response) {
					if (response.ok) {
						return response.json();
					} else {
						throw "La oferta ya existe";
					}
				})
				.then(response => {
                obtenerOfertas();
            })
	})
});