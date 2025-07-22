import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  BadRequestException,
  Get,
  Body,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { diskStorage } from "multer";
import { extname } from "path";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { User } from "src/user/entities/user.entity";
import { CreateUploadDto } from "./dto/upload.dto";

interface AuthenticatedRequest extends Request {
  user: User;
}
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUploadDto: CreateUploadDto,
    @Req() req: AuthenticatedRequest
  ) {
    const user = req.user;
    if (!req.user) {
      throw new BadRequestException("User not authenticated");
    }
    return this.uploadService.uploadToSupabase(file, user.id, createUploadDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUploads(@Req() req: AuthenticatedRequest) {
    const user = req.user;
    if (!user) {
      throw new BadRequestException("User not authenticated");
    }
    return this.uploadService.getUploadsByUser(user.id);
  }
}
