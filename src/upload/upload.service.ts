import { Injectable, BadRequestException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Upload } from "./entities/upload.entity";
import { CreateUploadDto } from "./dto/upload.dto";

@Injectable()
export class UploadService {
  private supabaseUrl: string;
  private supabaseKey: string;

  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Upload) private uploadRepo: Repository<Upload>
  ) {
    this.supabaseUrl = this.configService.get<string>("SUPABASE_URL")!;
    this.supabaseKey = this.configService.get<string>(
      "SUPABASE_SERVICE_ROLE_KEY"
    )!;
  }
  supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  async uploadToSupabase(
    file: Express.Multer.File,
    userId: number,
    createUploadDto: CreateUploadDto
  ) {
    if (!file) throw new BadRequestException("No file provided");

    const fileExt = file.originalname.split(".").pop();
    const fileName = `${randomUUID()}.${fileExt}`;
    const fileSize = file.size;
    const { data, error } = await this.supabase.storage
      .from("uploads")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw new BadRequestException(error.message);

    const { data: publicUrlData } = this.supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    const user = await this.userRepo.findOneByOrFail({ id: userId });
    await this.uploadRepo.save({
      title: createUploadDto.title,
      description: createUploadDto.description,
      user,
      fileName,
      fileUrl: publicUrlData.publicUrl,
      fileType: file.mimetype,
      fileSize,
    });
    return {
      message: "File uploaded successfully",
      fileUrl: publicUrlData.publicUrl,
      fileName,
    };
  }
  async getUploadsByUser(userId: number) {
    const user = await this.userRepo.findOneByOrFail({ id: userId });
    return this.uploadRepo.find({
      where: { user },
    });
  }
}
