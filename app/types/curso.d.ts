export interface Profesor {
  nombre: string;
  imagen: string;
  usuarioSocial: string;
  enlacePerfil: string;
}

export interface TemarioModulo {
  title: string;
  items: string[];
}

export interface CourseDetails {
  date: string;
  duration: string;
  level: string;
  offer: string;
}

export interface Curso {
  id: string; // Es CRUCIAL que este ID sea ÚNICO para cada curso en tu JSON
  slug: string;
  category: string;
  src: string;
  name: string;
  titulo: string;
  descripcion: string;
  fechatext: string;
  about: string;
  profesores: Profesor[];
  paraQuienEs: string[];
  conocimientosPrevios: string[];
  temarios: TemarioModulo[];
  fecha: string;
  learnings: string[];
  details: CourseDetails;
  remainingSeats: string;
  precio: number;
  descuento: number;
}