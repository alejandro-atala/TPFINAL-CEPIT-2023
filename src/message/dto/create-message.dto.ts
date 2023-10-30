import { IsString, IsNumber } from 'class-validator';
import { Column } from 'typeorm';

export class CreateMessageDto {
  @IsString()
  content: string;

  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number; // Agregamos receiverId para identificar al receptor

}
