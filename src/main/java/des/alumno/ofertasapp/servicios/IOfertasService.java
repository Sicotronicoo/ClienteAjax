package des.alumno.ofertasapp.servicios;

import java.util.List;

import des.alumno.ofertasapp.entidades.Oferta;

public interface IOfertasService {
	public List<Oferta> buscarTodas();
	public Oferta guardar(Oferta oferta);
	public void borrar(Integer idOferta);
	public Oferta buscarPorId(Integer idOferta);
	public Oferta actualizar(Oferta oferta);
}
