import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
async create(@Body() messageData: CreateMessageDto): Promise<Message> {
  console.log('Datos del mensaje recibidos en el servidor:', messageData);

  const { content, senderId, receiverId} = messageData;
  return this.messageService.createMessage(content, senderId, receiverId);
}

  @Get()
  async getAllMessages(): Promise<Message[]> {
    return this.messageService.getAllMessages();
  }

  @Get(':userId')
  async getMessages(@Param('userId') userId: number): Promise<Message[]> {
    return this.messageService.getMessagesByUser(userId);
  }

  @Get('previous/:senderId/:receiverId')
  async getPreviousMessages(
    @Param('senderId') senderId: number,
    @Param('receiverId') receiverId: number,
  ): Promise<Message[]> {
    return this.messageService.getPreviousMessages(senderId, receiverId);
  }

  @Delete(':messageId')
  async deleteMessage(@Param('messageId') messageId: number): Promise<void> {
    await this.messageService.deleteMessage(messageId);
  }
}
