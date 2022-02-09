package des.alumno.ofertasapp.servicios;

import java.util.List;

import des.alumno.ofertasapp.entidades.Oferta;

public interface IOfertasService {
	List<Oferta> buscarTodas();
	void guardar(Oferta oferta);
	void borrar(Integer idOferta);
	Oferta buscarPorId(Integer idOferta);
}
