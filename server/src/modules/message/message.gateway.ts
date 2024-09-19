import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: { senderId: string; receiverId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messageService.createMessage(
      data.senderId,
      data.receiverId,
      data.content,
    );

    // Emit the message to the receiver's room
    this.server.to(data.receiverId).emit('receiveMessage', message);

    // Emit the message back to the sender
    client.emit('receiveMessage', message);

    return message;
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(userId); // Join the room with the user's ID
    console.log(`${userId} joined their room`);

    // Fetch chat history for the user and emit it back
    const messages = await this.messageService.getMessagesForUser(userId);
    client.emit('chatHistory', messages); // Send chat history to the client
  }
}
