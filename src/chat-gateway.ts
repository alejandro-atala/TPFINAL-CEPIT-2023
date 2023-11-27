import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedUsers: Record<string, string> = {};

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    const usuarioNombre = client.handshake.query.usuario as string;
    this.connectedUsers[client.id] = usuarioNombre;
    this.emitConnectedUsers();
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
    const usuarioNombre = this.connectedUsers[client.id];
    if (usuarioNombre) {
      delete this.connectedUsers[client.id];
      this.emitConnectedUsers();
    }
  }

  @SubscribeMessage('chat_message')
  handleMessage(
    client: Socket,
    data: {
      content: string;
      senderId: number;
      receiverId: number;
      receiver?: string;
    },
  ): void {
    if (!data || !data.content || !data.senderId || !data.receiverId) {
      return;
    }

    console.log('Mensaje recibido:', data.content);

    if (data.receiver) {
      const destinatarioSocketId = Object.keys(this.connectedUsers).find(
        (socketId) => Number(socketId) === data.receiverId,
      );

      if (destinatarioSocketId) {
        this.server.to(destinatarioSocketId).emit('chat_message', data);
      } else {
        client.emit('destinatario_no_conectado', {
          error: 'El destinatario no está conectado',
        });
      }
    } else {
      this.server.emit('chat_message', data);
    }
  }

  @SubscribeMessage('delete_message_for_all')
  async handleDeleteMessageForAll(
    client: Socket,
    data: { messageId: number; receiverId: number },
  ): Promise<void> {
    if (!data || !data.messageId) {
      return;
    }

    try {
      const destinatarioSocketId = Object.keys(this.connectedUsers).find(
        (socketId) => Number(socketId) === data.receiverId,
      );

      if (destinatarioSocketId) {
        // Emitir un evento solo para el receptor para actualizar el chat
        this.server
          .to(destinatarioSocketId)
          .emit('delete_message_for_all', { messageId: data.messageId });
      }

      // Emitir un evento para el remitente para actualizar su chat
      client.emit('message_deleted_for_me', { messageId: data.messageId });

      // Emitir un evento para el remitente para indicar que el mensaje se eliminó para todos
      client.emit('message_deleted_for_all', { messageId: data.messageId });
    } catch (error) {
      // Manejar el error si es necesario
      console.error(error);
    }
  }

  @SubscribeMessage('message_deleted_for_me')
  async handleMessageDeletedForMe(
    client: Socket,
    data: { messageId: number },
  ): Promise<void> {
    if (!data || !data.messageId) {
      return;
    }

    try {
      // Emitir un evento solo para el receptor para actualizar el chat
      client.emit('message_deleted_for_me', { messageId: data.messageId });
    } catch (error) {
      // Manejar el error si es necesario
      console.error(error);
    }
  }

  private emitConnectedUsers() {
    const userNames = Object.values(this.connectedUsers);
    this.server.emit('connected_users', userNames);
  }
}
