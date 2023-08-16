import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Asistencia {
    
    @PrimaryGeneratedColumn()
    public idAsistencia: number;

    @Column()
    public fechaAsistencia: number;

    @Column()
    public presente: boolean;
  
    constructor(idAsistencia: number, fechaAsistencia: number, presente: boolean) { 
        this.idAsistencia = idAsistencia;
        this.fechaAsistencia = fechaAsistencia;
        this.presente = presente;
     } 

    public getIdAsistencia(): number {
        return this.idAsistencia;
    }

    public setIdAsistencia(idAsistencia: number): void {
        this.idAsistencia = idAsistencia;
    }
    
    public getFechaAsistencia(): number {
        return this.fechaAsistencia;
    }
    
    public setFechaAsistencia(fechaAsistencia: number): void {
        this.fechaAsistencia = fechaAsistencia;
    }

    public getPresente(): boolean {
        return this.presente;
    }

    //deberia ser true or false no?
    public setPresente(presente: boolean): void {
        this.presente = presente;
    }
}
