import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


    @Entity()
    export class Imagenes {
    
    
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column()
      nombre: string; 
    
    
      @Column()
      url: string; 
    
      
    } 
