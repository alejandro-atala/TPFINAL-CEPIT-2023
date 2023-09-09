import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Textos {


  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  referencia: string; 


  @Column({type : 'text'})
  texto: string; 

} 