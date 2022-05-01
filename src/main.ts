import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3003;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "POST,GET,DELETE,PUT,OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  });

  const config = new DocumentBuilder()
    .setTitle("Social Network")
    .setDescription("backend for social network")
    .setVersion("1.0")
    .addTag("social-network")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}

bootstrap();
