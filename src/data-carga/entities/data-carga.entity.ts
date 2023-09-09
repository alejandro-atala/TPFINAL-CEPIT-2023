import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Textos {


  @PrimaryGeneratedColumn()
  id: number;

  @Column({type : 'text'})
  texto: string; 

}