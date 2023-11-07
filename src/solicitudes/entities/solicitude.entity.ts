import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Solicitude {

    
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @PrimaryGeneratedColumn()
  idUsuario: number;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  nombre: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  dni: string;


  @ApiProperty({
    type: Date,
    description: 'This is a required property',
  })
  @Column({ type: 'date'  })
  fechaNac: Date;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  direccion: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  telefono: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  email: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  password: string; 


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  tipo: string;


  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @Column()
  curso: string;

  

}
