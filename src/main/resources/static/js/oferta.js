document.addEventListener("DOMContentLoaded", function() {
	obtenerOfertas();
	$("#anadir").click(crearOferta);
});

function obtenerOfertas() {
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
}
$(document).on('click', '#borrar', function() {
 	  	let tr = $(this).closest("tr");
 	  	let id = tr[0].childNodes[0].innerText;
	   	let ruta = "/borrar/"+id;
	    window.location.href = ruta;
	    $(this).closest('tr').remove(); 
});

function crearOferta(){
	if($('#inputNombre').val() != "" && $('#selectProducto').val() != "" 
		&& $('#inputPrecio').val() != "" && $('#inputEnlace').val() != "" 
		&& $('#inputDescripcion').val() != ""){
		fetch('/oferta/crear', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({nombre: $('#inputNombre').val(), prioridad: $('#selectProducto').val()
            ,precio: $('#inputPrecio').val(), hiperenlace: $('#inputEnlace').val(), descripcion: $('#inputDescripcion').val()})
        })
		
	};
}

$(document).on('click', '#info', function() {
	$("#modal").modal('show');
	
	$(".btn-close").on('click', function(){
		$("#modal").modal("hide");
	});
	$("#cerrar-modal").on('click', function(){
		$("#modal").modal("hide");
	});
	
 	 let tr = $(this).closest("tr");
 	 let id = tr[0].childNodes[0].innerText;
		fetch('/oferta/'+ id, { headers: { "Content-Type": "application/json; charset=utf-8" } })
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

$(document).on('click', '#filtrarPorPrioridad', function() {

    const prioridad = document.querySelector('input[name="optionsRadios"]:checked').value;
 	fetch('/prioridad/'+prioridad, {headers: {"Content-Type": "application/json; charset=utf-8"}})
        .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
        .then(response => {
	
					let ModalBody = document.getElementsByClassName("modal-body")[0];
					ModalBody.replaceChildren();
					let ModalTitle = document.getElementsByClassName("modal-title")[0];
					
					ModalTitle.textContent = response.nombre;
					
					let infoId = document.createElement('p');
					infoId.textContent = 'ID: ' + response.id;
					let infoNombre = document.createElement('p');
					infoNombre.textContent = 'NOMBRE: ' + response.nombre;
					let infoFecha = document.createElement('p');
					infoFecha.textContent = 'FECHA PUBLICACIÓN: ' +response.fecha_publicacion;
					let infoPrecio = document.createElement('p');
					infoPrecio.textContent = 'PRECIO: ' +response.precio;
					let infoPrioridad = document.createElement('p');
					infoPrioridad.textContent = 'PRIORIDAD: ' +response.prioridad;
					let infoEnlace = document.createElement('p');
					infoEnlace.textContent = 'HIPERVINCULO: ' +response.hiperenlace;
					
					ModalBody.appendChild(infoId);
					ModalBody.appendChild(infoNombre);
					ModalBody.appendChild(infoFecha);
					ModalBody.appendChild(infoPrioridad);
					ModalBody.appendChild(infoEnlace);
					ModalBody.appendChild(infoPrecio);
			

         
    });
});
