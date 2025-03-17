import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

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

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(Number(process.env.HOST_PORT));
  
}
bootstrap();
