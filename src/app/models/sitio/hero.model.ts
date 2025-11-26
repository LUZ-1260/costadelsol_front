export interface HeroModel {
  id: number,
  titulo: string,
  subtitulo: string,
  descripcion: string,
  imagen: string,
  boton_texto: string,
  boton_url: string,
  orden: number,
  estado: boolean,
  fecha_registro: Date,
  fecha_actualizacion: Date
}
