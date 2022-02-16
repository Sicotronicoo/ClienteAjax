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
import org.springframework.web.bind.annotation.PostMapping;
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
	@RequestMapping(method = RequestMethod.GET, value = "/index")
	public List<Oferta>index_get() {		
		return servicioOferta.buscarTodas();
	}
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "crear")
	public ResponseEntity<Object> crearOferta(@RequestBody Map<String, String> json) {
		Oferta oferta = new Oferta();
		oferta.setFecha_Publicacion(new Date()); 

		oferta.setNombre(json.get("nombre"));
		oferta.setNombre(json.get("prioridad"));
		oferta.setNombre(json.get("precio"));
		oferta.setNombre(json.get("enlace"));
		oferta.setNombre(json.get("descripcion"));

		servicioOferta.guardar(oferta);
		
		return new ResponseEntity<Object>(oferta, HttpStatus.OK);

	}
	/*@ResponseBody
	@PostMapping("/crear")
	public String crear_post(Oferta oferta) {		
		oferta.setFecha_Publicacion(new Date()); 
		servicioOferta.guardar(oferta);
		return "redirect:/index";
	}*/
	@ResponseBody
	@PostMapping("/actualizar")
	public String actualizar(Oferta oferta) {		
		oferta.setFecha_Publicacion(new Date()); 
		servicioOferta2.save(oferta);
		return "redirect:/index";
	}
	
	@GetMapping("/borrar/{id}")
	public String borrarOferta(@PathVariable("id") int idOferta) {
		servicioOferta.borrar(idOferta);
		return "redirect:/";
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/oferta/{id}")
	public Oferta  getPerfil(@PathVariable("id") int idOferta) {
		return servicioOferta.buscarPorId(idOferta);
	}	
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/prioridad/{prioridad}")
	public List<Oferta>  getOfertasPorPrioidad(@PathVariable("prioridad") String prioridad) {
			
		return servicioOferta2.findByPrioridad(prioridad);
	}	
	
}
