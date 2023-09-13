// Controlador de mensajes (messages.controller.ts)
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {

  constructor(private readonly messagesService: ChatService) {}

  @Post()
  create(@Body() createMessageDto: CreateChatDto) {
    console.log(createMessageDto)
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }
}
