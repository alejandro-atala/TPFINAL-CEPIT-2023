export class CreateAlumnoDto {

    // si quieren cambiar el nombre a los atributos lo hacen pero que quede detallado que es del alumno
    // no se si hay que poner el readonly
    public idAlumno: number;
    public nombreAlmuno: string;
    public dniAlumno: number;
    public fechaNacAlumno: number; //no se como poner date solo me deja number
    public nroLegajoAlumno: number;
    public direccionAlumno: string;

}
