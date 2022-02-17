package des.alumno.ofertasapp.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
	public Oferta guardar(Oferta oferta) {
		try {
			Oferta oferta1 = ofertasRepo.save(oferta);
			return oferta1;
		} catch (DataAccessException dae) {
			return null;
		}
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
}
