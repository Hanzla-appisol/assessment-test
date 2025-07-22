import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Upload } from "./entities/upload.entity";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Upload])],
  controllers: [UploadController],
  providers: [UploadService, AuthGuard],
})
export class UploadModule {}
