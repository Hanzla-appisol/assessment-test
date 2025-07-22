import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Upload } from "src/upload/entities/upload.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Upload])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
