create database Oferta;
use Oferta;
drop table Oferta;
create table Oferta(
id_Oferta int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(20) NOT NULL,
fecha_Publicacion VARCHAR(30),
prioridad VARCHAR(500) NOT NULL,
enlace VARCHAR(200) NOT NULL,
descripcion VARCHAR(300) NOT NULL,
precio double(5,2) NOT NULL
);