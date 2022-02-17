package des.alumno.ofertasapp.controladores;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.repository.OfertasRepository;
import des.alumno.ofertasapp.servicios.IOfertasService;

@Controller
public class IndexController {

	@Autowired
	private IOfertasService servicioOferta;
	@Autowired
	private OfertasRepository servicioOferta2;

	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/index")
	public List<Oferta> index_get() {
		return servicioOferta.buscarTodas();
	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/crear")
	public ResponseEntity<Object> crearOferta(@RequestParam Map<String, String> json) {

		String precio = json.get("precio");
		float price = Float.parseFloat(precio);
		
		Oferta oferta = servicioOferta.guardar(new Oferta( json.get("nombre"), new Date(), 
				json.get("prioridad"),	json.get("enlace"),	json.get("descripcion"),price));

		if (oferta != null)
			return new ResponseEntity<Object>(oferta, HttpStatus.OK);
		else
			return new ResponseEntity<Object>(new Error("Email ya existente"), HttpStatus.FORBIDDEN);

		
		/*Oferta oferta = new Oferta(); 
		 
		 oferta.setFecha_Publicacion(new Date());		 
		  String precio = json.get("precio");
		 float price = Float.parseFloat(precio);		 
		 oferta.setNombre(json.get("nombre"));
		 oferta.setPrioridad(json.get("prioridad")); oferta.setPrecio(price);
		 oferta.setEnlace(json.get("enlace"));
		 oferta.setDescripcion(json.get("descripcion"));
		 
		 servicioOferta.guardar(oferta);
		 
		 return new ResponseEntity<Object>(oferta, HttpStatus.OK);*/

	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/editarOferta")
	public ResponseEntity<Object> actualizarOferta(@RequestParam Map<String, String> json) {
		
		Oferta oferta = new Oferta();
		
		String precio = json.get("precio");
		float price = Float.parseFloat(precio);		
		oferta.setNombre(json.get("nombre"));
		oferta.setPrioridad(json.get("prioridad"));
		oferta.setEnlace(json.get("hiperenlace"));
		oferta.setDescripcion(json.get("descripcion"));
		oferta.setPrecio(price);
		
		Oferta ofertaEditada = servicioOferta.actualizar(oferta);
        
		return new ResponseEntity<Object>(ofertaEditada, HttpStatus.OK);
		
	}

	@GetMapping("/borrar/{id}")
	public String borrarOferta(@PathVariable("id") int idOferta) {
		servicioOferta.borrar(idOferta);
		return "redirect:/";
	}

	
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/oferta/{id}")
	public Oferta getPerfil(@PathVariable("id") int idOferta) {
		return servicioOferta.buscarPorId(idOferta);
	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/prioridad/{prioridad}")
	public List<Oferta> getOfertasPorPrioidad(@PathVariable("prioridad") String prioridad) {

		return servicioOferta2.findByPrioridad(prioridad);
	}

}
