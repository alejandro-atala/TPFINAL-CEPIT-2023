import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Usuario {
    @PrimaryGeneratedColumn()
    public idUsuario: number;

    @Column()
    public nombreUsuario: string;

    @Column()
    public dniUsuario: number;
  
    constructor(idUsuario: number, nombreUsuario: string, dniUsuario: number) { 
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.dniUsuario = dniUsuario;
     } 

    public getIdUsuario(): number {
        return this.idUsuario;
    }

    public setIdUsuario(idUsuario: number): void {
        this.idUsuario = idUsuario;
    }
    
    public getNombreUsuario(): string {
        return this.nombreUsuario;
    }
    
    public setNombreUsuario(nombreUsuario: string): void {
        this.nombreUsuario = nombreUsuario;
    }

    public getdniUsuario(): number {
        return this.dniUsuario;
    }

}
