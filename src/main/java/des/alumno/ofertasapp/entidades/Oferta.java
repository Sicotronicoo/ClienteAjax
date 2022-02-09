package des.alumno.ofertasapp.entidades;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Oferta")
public class Oferta {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "id_Oferta")
	private Integer id_oferta;
	private String nombre;
	private Date fecha_Publicacion;
	private String prioridad;
	private String enlace;
	private String descripcion;
	private double precio;
	
	public Oferta() {
		
	}	
	
	public Oferta(int id_oferta, String nombre, Date fecha_Publicacion, String prioridad, String enlace,
			String descripcion, double precio) {
		super();
		this.id_oferta = id_oferta;
		this.nombre = nombre;
		this.fecha_Publicacion = fecha_Publicacion;
		this.prioridad = prioridad;
		this.enlace = enlace;
		this.descripcion = descripcion;
		this.precio = precio;
	}


	
	public Integer getId_oferta() {
		return id_oferta;
	}

	public void setId_oferta(Integer id_oferta) {
		this.id_oferta = id_oferta;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Date getFecha_Publicacion() {
		return fecha_Publicacion;
	}
	public void setFecha_Publicacion(Date fecha_Publicacion) {
		this.fecha_Publicacion = fecha_Publicacion;
	}
	public String getPrioridad() {
		return prioridad;
	}
	public void setPrioridad(String prioridad) {
		this.prioridad = prioridad;
	}
	public String getEnlace() {
		return enlace;
	}
	public void setEnlace(String enlace) {
		this.enlace = enlace;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public double getPrecio() {
		return precio;
	}
	public void setPrecio(double precio) {
		this.precio = precio;
	}

	@Override
	public String toString() {
		return "Oferta [id_oferta=" + id_oferta + ", nombre=" + nombre + ", fecha_Publicacion=" + fecha_Publicacion
				+ ", prioridad=" + prioridad + ", enlace=" + enlace + ", descripcion=" + descripcion + ", precio="
				+ precio + "]";
	}	
	
	
}
