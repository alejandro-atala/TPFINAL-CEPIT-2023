import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Escuela {
    @PrimaryGeneratedColumn()
    public idEscuela: number;

    @Column({unique : true}) 
    public nombreEscuela: string;

    @Column()
    public cue: number;
  
    constructor(idEscuela: number, nombreEscuela: string, cue: number) { 
        this.idEscuela = idEscuela;
        this.nombreEscuela = nombreEscuela;
        this.cue = cue;
     } 

    public getIdEscuela(): number {
        return this.idEscuela;
    }

    public setIdEscuela(idEscuela: number): void {
        this.idEscuela = idEscuela;
    }
    
    public getNombreEscuela(): string {
        return this.nombreEscuela;
    }
    
    public setNombreEscuela(nombreEscuela: string): void {
        this.nombreEscuela = nombreEscuela;
    }

    public getCue(): number {
        return this.cue;
    }

    // el set de cue no lo hago porque es un dato que no se puede modificar
    
}
