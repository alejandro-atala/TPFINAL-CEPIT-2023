import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Curso {

    @PrimaryGeneratedColumn()
    public idCurso: number;

    @Column()
    public anioCurso: number;
  
    constructor(idCurso: number, anioCurso:number) { 
        this.idCurso = idCurso;
        this.anioCurso = anioCurso;
     } 

    public getIdCurso(): number {
        return this.idCurso;
    }

    public setIdCurso(idCurso: number): void {
        this.idCurso = idCurso;
    }

    public getAnioCurso(): number {
        return this.anioCurso;
    }

    public setAnioCurso(anioCurso: number): void{
        this.anioCurso = anioCurso;
    }

}
