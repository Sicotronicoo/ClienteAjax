package des.alumno.ofertasapp.controladores;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	@PostMapping("/crear")
	public boolean crear_post(Oferta oferta) {		
		oferta.setFecha_Publicacion(new Date()); 
		servicioOferta.guardar(oferta);
		return true;
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
