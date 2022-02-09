package des.alumno.ofertasapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import des.alumno.ofertasapp.entidades.Oferta;

public interface OfertasRepository  extends JpaRepository<Oferta, Integer>{
	List<Oferta> findByPrioridad(String prioOferta);
}
