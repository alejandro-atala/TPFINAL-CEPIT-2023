import { Column, PrimaryGeneratedColumn } from "typeorm";

export class NotasExamene {

    @PrimaryGeneratedColumn()
    public idNota: number;

    @Column()
    public nota: number;

    @Column()
    public fechaNota: number;
  
    constructor(idNota: number, nota: number, fechaNota: number) { 
        this.idNota = idNota;
        this.nota = nota;
        this.fechaNota = fechaNota;
     } 

    public getIdNota(): number {
        return this.idNota;
    }

    public setIdNota(idNota: number): void {
        this.idNota = idNota;
    }
    
    public getNota(): number {
        return this.nota;
    }
    
    public setNota(nota: number): void {
        this.nota = nota;
    }

    public getFechaNota(): number {
        return this.fechaNota;
    }

    public setFechaNota(fechaNota: number): void {
        this.fechaNota = fechaNota;
    }
}
