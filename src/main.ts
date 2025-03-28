import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);




  /// for Swagger document
  const config = new DocumentBuilder()
    .setTitle('Khang-Intern-Yootek-IoT-API-Document')
    .setDescription('This is an api document for the project i did to learn nestjs in Yootek')
    .setVersion('1.0')
    .addBearerAuth() // for JwtToken authentication
    .addTag('App')
    .addTag('Auth')  
    .addTag('Profile')     
    .addTag('Post')   
    .addTag('User')     
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  // end of "for Swagger document"





  app.useGlobalPipes(new ValidationPipe())
  // app.useWebSocketAdapter(new WsAdapter(app)); // WebSocket adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  const configService = new ConfigService();

  // await app.listen(Number(process.env.HOST_PORT));
  await app.listen(Number(configService.get<string>('HOST_PORT')));


  

  
  const appMqtt = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: configService.get<string>('MQTT_BROKER_URL')
      // host: 'localhost',
      // port: 1883, // MQTT default port
    },
  });
  await appMqtt.listen();
  
  // Create WebSocket Gateway 
  // const appWs = await NestFactory.create(AppModule);
  // appWs.useWebSocketAdapter(new IoAdapter(appWs)); // WebSocket adapter
  // await appWs.listen(8082); // Use port 8082 for WebSocket

}
bootstrap();
