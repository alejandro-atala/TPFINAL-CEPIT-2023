import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Textos {

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  id: number;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  referencia: string; 



  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column({type : 'text'})
  texto: string; 

  
} 