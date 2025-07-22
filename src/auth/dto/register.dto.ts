import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
  @ApiProperty({
    example: "user@example.com",
    description: "The email address of the user",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "2000-01-01",
    description: "The date of birth of the user (YYYY-MM-DD)",
  })
  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @ApiProperty({
    example: "StrongP@ssw0rd!",
    description:
      "Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
  })
  @IsNotEmpty()
  @MinLength(6, {
    message: "Password must be at least 6 characters long",
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        "Password too weak. It must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    }
  )
  password: string;
}
