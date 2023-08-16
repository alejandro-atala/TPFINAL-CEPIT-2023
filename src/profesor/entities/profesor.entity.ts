import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Profesor {

    @PrimaryGeneratedColumn()
    public idProfesor: number;

    @Column({unique : true}) 
    public nombreProfesor: string;

    @Column()
    public dniProfesor: number;

    @Column()
    public fechaNacProfesor: number;

    @Column()
    public nroLegajoProfesor: number;

    @Column()
    public direccionProfesor: string;

  
    constructor(idProfesor: number, nombreProfesor: string, dniProfesor: number, fechaNacProfesor: number,
        nroLegajoProfesor:number, direccionProfesor: string) { 
        this.idProfesor = idProfesor;
        this.nombreProfesor = nombreProfesor;
        this.dniProfesor = dniProfesor;
        this.fechaNacProfesor = fechaNacProfesor;
        this.nroLegajoProfesor = nroLegajoProfesor;
        this.direccionProfesor = direccionProfesor;
     } 

    public getIdProfesor(): number {
        return this.idProfesor;
    }

    public setIdProfesor(idProfesor: number): void {
        this.idProfesor = idProfesor;
    }
    
    public getNombreProfesor(): string {
        return this.nombreProfesor;
    }
    
    public setNombreProfesor(nombreProfesor: string): void {
        this.nombreProfesor= nombreProfesor;
    }

    public getdniProfesor(): number {
        return this.dniProfesor;
    }
    
    public getFechaNacProfesor(): number {
        return this.fechaNacProfesor;
    }

    public getNroLegajoProfesor(): number {
        return this.nroLegajoProfesor;
    }

    public getDireccionProfesor(): string{
        return this.direccionProfesor;
    }

    public setDireccionProfesor(direccionProfesor: string): void {
        this.direccionProfesor = direccionProfesor;
    }
}
