import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Materia {

    @PrimaryGeneratedColumn()
    public idMateria: number;

    @Column() 
    public nombreMateria: string;

    @Column()
    public horarioMateria: number;

  
    constructor(idMateria: number, nombreMateria: string, horarioMateria: number) { 
        this.idMateria = idMateria;
        this.nombreMateria = nombreMateria;
        this.horarioMateria= horarioMateria;
     } 

    public getIdMateria(): number {
        return this.idMateria;
    }

    public setIdMateria(idMateria: number): void {
        this.idMateria = idMateria;
    }
    
    public getNombreMateria(): string {
        return this.nombreMateria;
    }
    
    public setNombreMateria(nombreMateria: string): void {
        this.nombreMateria = nombreMateria;
    }

    public getHorarioMateria(): number {
        return this.horarioMateria;
    }

    public setHorarioMateria(horarioMateria: number): void{
        this.horarioMateria = horarioMateria;
    }
}
