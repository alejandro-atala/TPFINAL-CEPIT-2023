import { retry } from "rxjs";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Alumno {
    
    @PrimaryGeneratedColumn()
    public idAlumno: number;

    @Column({unique : true}) // eso de unique no se para que sirve lo copie del otro proyecto asi
    public nombreAlmuno: string;

    @Column()
    public dniAlumno: number;

    @Column()
    public fechaNacAlumno: number;

    @Column()
    public nroLegajoAlumno: number;

    @Column()
    public direccionAlumno: string;

    constructor(idAlumno: number, nombreAlumno: string, dniAlumno: number, fechaNacAlumno: number, 
        nroLegajoAlumno:number, direccionAlumno: string) { 
        this.idAlumno = idAlumno;
        this.nombreAlmuno = nombreAlumno;
        this.dniAlumno = dniAlumno;
        this.fechaNacAlumno = fechaNacAlumno;
        this.nroLegajoAlumno = nroLegajoAlumno;
        this.direccionAlumno = direccionAlumno;
     } 

    public getIdAlumno(): number {
        return this.idAlumno;
    }

    public setIdAlumno(idAlumno: number): void {
        this.idAlumno = idAlumno;
    }
    
    public getNombreAlumno(): string {
        return this.nombreAlmuno;
    }
    
    public setNombreAlumno(nombreAlmuno: string): void {
        this.nombreAlmuno = nombreAlmuno;
    }

    public getDniAlumno(): number {
        return this.dniAlumno;
    }
    // mod si quieren las mayusculas y minisculas
    // los set de dni, fecha de nacimiento y legajo no los hago porque son datos que no se deberian modificar
    
    public getFechaNacAlumno(): number {
        return this.fechaNacAlumno;
    }

    public getNroLegajoAlumno(): number {
        return this.nroLegajoAlumno;
    }

    public getDireccionAlumno(): string{
        return this.direccionAlumno;
    }

    public setDireccionAlumno(direccionAlumno: string): void {
        this.direccionAlumno = direccionAlumno;
    }
 
}

  
    
    