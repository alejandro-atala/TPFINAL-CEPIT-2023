
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Message, Usuario ]),
  Usuario, 
],
  providers: [MessageService],
  controllers: [MessageController],
})
export class messageModule {}
