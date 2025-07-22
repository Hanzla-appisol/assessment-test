import { IsNotEmpty, IsString } from "class-validator";

export class CreateUploadDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
