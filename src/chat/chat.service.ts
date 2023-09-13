// Servicio de mensajes (messages.service.ts)
import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private messagesRepository: Repository<Chat>,
  ) {}

  async create(createMessageDto: CreateChatDto): Promise<Chat> {
    const message = new Chat();
    message.content = createMessageDto.content;
    message.idAlumno = createMessageDto.idAlumno;
    message.idProfesor = createMessageDto.idProfesor;
    return this.messagesRepository.save(message);
  }


  findAll(): Promise<Chat[]> {
    return this.messagesRepository.find();
  }
}
