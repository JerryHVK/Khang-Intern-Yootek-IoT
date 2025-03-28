import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({transports: ['websocket']})
export class DeviceGateway implements OnGatewayConnection, OnGatewayDisconnect {

  // static room: string = 'khang';

  // static clientId: string;

  // Lưu trữ các clientId và client socket
  static clients: { [key: string]: Socket } = {};

  // @WebSocketServer() 
  // server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: any, @ConnectedSocket() client: Socket){
    console.log("Message from clientId ", client.id, ": ", message);
    client.emit('fromServer', message)
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Connected - clientId: ', client.id);
    // DeviceGateway.clientId = client.id;
    // client.join(DeviceGateway.room);
    // nghỉ khỏe đi, lưu hẳn client vào biến static ở đây luôn cho rồi
    DeviceGateway.clients[client.id] = client; // Lưu trữ clientId

  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Disconnected - clientId: ', client.id);
    // client.leave(DeviceGateway.room);
    delete DeviceGateway.clients[client.id];
    
  }

  emitDataToClient(data: any){
    // console.log("data: ", data);

    // console.log("clientId: ", DeviceGateway.clientId);
    // if(this.server){
    //   this.server.to(DeviceGateway.room).emit('device-data', data);
    //   this.server.to(DeviceGateway.room).emit('fromServer', data);
    //   this.server.to(DeviceGateway.clientId).emit('device-data', data);
    //   this.server.to(DeviceGateway.clientId).emit('fromServer', data);
    // }
    // else{
    //   console.log("Server is not defined");
    // }

    for(let clientId in DeviceGateway.clients){
      // console.log("loop");

      DeviceGateway.clients[clientId].emit('device-data', data);
    }
  }

}
