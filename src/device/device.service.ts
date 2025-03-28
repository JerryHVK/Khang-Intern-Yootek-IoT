import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DeviceService {
  constructor(
    @Inject('MQTT_SERVICE') private client: ClientProxy
  ){}

  async turnOffLight(topic: string){
    const offLightMessage = {"light": 0};
    await this.client.emit(topic, offLightMessage);
  }

  async turnOnLight(topic: string){
    const onLightMessage = {"light": 1};
    await this.client.emit(topic, onLightMessage);
  }
}
