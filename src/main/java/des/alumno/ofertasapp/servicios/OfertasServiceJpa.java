package des.alumno.ofertasapp.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import des.alumno.ofertasapp.entidades.Oferta;
import des.alumno.ofertasapp.repository.OfertasRepository;

@Service
public class OfertasServiceJpa implements IOfertasService {

	@Autowired
	private OfertasRepository ofertasRepo;

	@Override
	public List<Oferta> buscarTodas() {
		return ofertasRepo.findAll();
	}

	@Override
	public void guardar(Oferta oferta) {
		ofertasRepo.save(oferta);
	}

	@Override
	public void borrar(Integer idOferta) {
		ofertasRepo.deleteById(idOferta);
	}

	@Override
	public Oferta buscarPorId(Integer idOferta) {
		Optional<Oferta> optional = ofertasRepo.findById(idOferta);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	/*@Override
	public List<Oferta> buscarTodas(String prioridad) {
		List<Oferta> ofertas = ofertasRepo.findAll();
		for (Oferta o : ofertas) {
			if (o.getPrioridad() == prioridad) {
				return (List<Oferta>) o;
			}
		}
		return null;
	}*/
}
