import { PrimaryGeneratedColumn } from "typeorm";

export class AlumnoCurso {

    @PrimaryGeneratedColumn()
    public idAlumno_curso: number;

    constructor(idAlumno_curso: number) { 
        this.idAlumno_curso = idAlumno_curso;
     } 

    public getIdAlumno_curso(): number {
        return this.idAlumno_curso;
    }

    public setIdAlumno_cruso(idAlumno_curso: number): void {
        this.idAlumno_curso = idAlumno_curso;
    }
}
