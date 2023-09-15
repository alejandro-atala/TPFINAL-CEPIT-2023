import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

    @Entity()
    export class Imagenes {
    
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
      nombre: string; 
    
    
      @ApiProperty({
        type: String,
        description: 'This is a required property',
      })
      @Column()
      url: string; 
    
      
    } 
