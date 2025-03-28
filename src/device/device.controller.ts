import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { Public } from 'src/auth/decorators/public.decorator';
import { DeviceGateway } from './device.gateway';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(
    private deviceGateway: DeviceGateway, 
    private deviceService: DeviceService
  ){

  }
  private static sub_topic: string;

  @Public()
  @MessagePattern('device/data/sub')
  handleComingMessageFromBroker(@Payload() data, @Ctx() context: MqttContext){
    this.deviceGateway.emitDataToClient(data);
  }

  @ApiBearerAuth()
  @Public()
  @Get('off')
  turnOffLight() {
    this.deviceService.turnOffLight('device/data/pub');
  }

  @ApiBearerAuth()
  @Public()
  @Get('on')
  turnOnLight() {
    this.deviceService.turnOnLight('device/data/pub');
  }
}
