import { Usuario } from "src/usuario/entities/usuario.entity";
import { Message } from "./entities/message.entity";
import { Repository, getRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { FindOptions } from "typeorm";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Usuario) // Inyecta el repositorio de usuarios
    private usuarioRepository: Repository<Usuario>,
  ) {}
  
 async createMessage(content: string, senderId: number, receiverId: number): Promise<Message> {
    const message = new Message();
    message.content = content;

    // Obtener los objetos Usuario para el remitente y el receptor
    const sender = await this.usuarioRepository.findOne({ where: { idUsuario: senderId } });
    const receiver = await this.usuarioRepository.findOne({ where: { idUsuario: receiverId } });

    if (sender && receiver) {
      // Asignar los usuarios y configurar senderId y receiverId
      message.sender = sender;
      message.receiver = receiver;
      message.senderId = sender.idUsuario;
      message.receiverId = receiver.idUsuario;
      
      // Guardar el mensaje en la base de datos
      return this.messageRepository.save(message);
    } else {
      throw new Error("No se encontraron el remitente o el receptor");
    }
  }
  async getMessagesByUser(userId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: [
        { sender: { idUsuario: userId } },
        { receiver: { idUsuario: userId } },
      ],
    });
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async getPreviousMessages(senderId: number, receiverId: number): Promise<Message[]> {
    return this.messageRepository
      .createQueryBuilder('message')
      .where('(message.senderId = :senderId AND message.receiverId = :receiverId) OR (message.senderId = :receiverId AND message.receiverId = :senderId)', { senderId, receiverId })
      .orderBy('message.id', 'ASC')
      .getMany();
  }

  async deleteMessage(messageId: number): Promise<void> {
    await this.messageRepository
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where('id = :messageId', { messageId })
      .execute();
  }
}

