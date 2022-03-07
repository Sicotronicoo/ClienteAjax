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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	@GetMapping("/ofertas")
	public List<Oferta> paginaInicio() {
		return servicioOferta2.findAll();
	}

	
	@GetMapping("/index")
	public String  getIndex() {
		return "index";
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/crear")
	public ResponseEntity<Object> crearOferta(@RequestBody Map<String, String> json) {

		String precio = json.get("precio");
		float price = Float.parseFloat(precio);
		
		Oferta oferta = servicioOferta.guardar(new Oferta( json.get("nombre"), new Date(), 
				json.get("prioridad"),	json.get("enlace"),	json.get("descripcion"),price));

		if (oferta != null)
			return new ResponseEntity<Object>(oferta, HttpStatus.OK);
		else
			return new ResponseEntity<Object>(new Error("Email ya existente"), HttpStatus.FORBIDDEN);

	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/editarOferta")
	public ResponseEntity<Object> actualizarOferta(@RequestBody Map<String, String> json) {
		
		
		
		String idOferta = json.get("id");
		
		Integer id = Integer.valueOf(idOferta);
		String precio = json.get("precio");
	
		Oferta oferta = new Oferta();
		
		oferta.setId_oferta(id);
		float price = Float.parseFloat(precio);		
		oferta.setNombre(json.get("nombre"));
		oferta.setPrioridad(json.get("prioridad"));
		oferta.setFecha_Publicacion(new Date());
		oferta.setEnlace(json.get("hiperenlace"));
		oferta.setDescripcion(json.get("descripcion"));
		oferta.setPrecio(price);
		
		Oferta ofertaEditada = servicioOferta.guardar(oferta);
        
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
