import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private connectedUsers: { [socketId: string]: string } = {};

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    const usuarioNombre = client.handshake.query.usuario as string;
    this.connectedUsers[client.id] = usuarioNombre;
    this.emitConnectedUsers();
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
    if (this.connectedUsers[client.id]) {
      delete this.connectedUsers[client.id];
      this.emitConnectedUsers();
    }
  }

  @SubscribeMessage('chat_message')
  handleMessage(client: Socket, data: { content: string, senderId: number, receiverId: number, receiver?: string }): void {
    if (data && data.content && data.senderId && data.receiverId) {
      console.log('Mensaje recibido:', data.content);

      if (data.receiver) {
        const destinatarioSocketId = Object.keys(this.connectedUsers).find(
          (socketId) => Number(socketId) === data.receiverId
        );
        if (destinatarioSocketId) {
          this.server.to(destinatarioSocketId).emit('chat_message', data);
        } else {
          console.log(`Error: El destinatario ${data.receiver} no está conectado.`);
        }
      } else if (data.senderId !== Number(client.id)) {
        this.server.emit('chat_message', data);
      }
    } else {
      console.log('Mensaje recibido con campos faltantes o undefined:', data);
    }
  }

  private emitConnectedUsers() {
    const userNames = Object.values(this.connectedUsers);
    this.server.emit('connected_users', userNames);
  }
}
