import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({
    origin: [
      'http://localhost:3001',
    ],
    credentials: true, // allow cookies to be sent
  });
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not in DTO
      transform: true, // enables class-transformer
      forbidNonWhitelisted: true, // optional: throws if extra props
    })
  );
  app.use(cookieParser()); // for parsing cookies
  const config = new DocumentBuilder()
    .setTitle("NestJS API for assessment-test")
    .setDescription("NestJS Project for assessment-test")
    .setVersion("1.0")
    .addBearerAuth() // For JWT Auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
