import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Rol {
    @PrimaryGeneratedColumn()
    public idRol: number;

    @Column()
    public administrador: boolean;

    @Column()
    public usuario: boolean;
  
    constructor(idRol: number, administrador: boolean, usuario: boolean) { 
        this.idRol = idRol;
        this.administrador = administrador;
        this.usuario = usuario;
     } 

    public getIdRol(): number {
        return this.idRol;
    }

    public setIdRol(idRol: number): void {
        this.idRol = idRol;
    }
    
    public getAdministrador(): boolean {
        return this.administrador;
    }
    
    public setAdministrador(administrador: boolean): void {
        this.administrador = administrador;
    }

    public getUsuario(): boolean {
        return this.usuario;
    }

    public setUsuario(usuario: boolean): void {
        this.usuario = usuario;
    }

}
